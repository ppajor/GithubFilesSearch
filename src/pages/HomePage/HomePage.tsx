import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./HomePage.module.scss";
import Hero from "./Hero";
import Form from "./Form";
import SearchResults from "./SearchResults";
import ImageModal from "../../components/ImageModal";
import Pagination from "../../components/Pagination";

interface ResultItem {
  html_url: string;
  name: string;
  repository: {
    description: string | null;
    name: string;
    owner: {
      login: string;
      avatar_url: string;
    };
  };
}

interface FilteredResult {
  url: string;
  fileName: string;
  repo: { name: string; description: string | null };
  user: { name: string; avatar: string };
}

interface Inputs {
  phrase: string;
  user: string;
  language: string;
}

const options = [
  { name: "go", value: "go" },
  { name: "java", value: "java" },
  { name: "javascript", value: "javascript" },
];

const initialInputsValue = {
  phrase: "",
  user: "",
  language: options[0].value,
};

function HomePage() {
  const [inputsValue, setInputsValue] = useState<Inputs>(initialInputsValue);

  const [APIData, setAPIData] = useState<FilteredResult[] | null>(null);
  const [APIError, setAPIError] = useState<string | null>(null);
  const [modalAvatarPath, setModalAvatarPath] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);

  let filtersPath = "filters";
  console.log(inputsValue);

  useEffect(() => {
    const filters = JSON.parse(localStorage.getItem(filtersPath) || JSON.stringify(initialInputsValue));
    setInputsValue(filters);
  }, []);

  //API HANDLING
  const handleData = (page = 1) => {
    const { phrase, user, language } = inputsValue;
    localStorage.setItem(filtersPath, JSON.stringify(inputsValue));

    let currentPage = page;
    let API_PATH = `https://api.github.com/search/code?q=${phrase}+user:${user}+language:${language}&per_page=${resultsPerPage}&page=${currentPage}`; //trzeba spacje ogarnac
    getAPIData(API_PATH);
    console.log(API_PATH);
  };

  const getAPIData = async (path: string) => {
    try {
      const response = await axios.get(path);
      const itemsCount = response.data.total_count;
      const dataItems = response.data.items;
      // console.log("data items", dataItems);
      // console.log("cuurent page", currentPage);
      let filteredData = dataItems.map((el: ResultItem): FilteredResult => {
        return {
          url: el.html_url,
          fileName: el.name,
          repo: { name: el.repository.name, description: el.repository.description },
          user: { name: el.repository.owner.login, avatar: el.repository.owner.avatar_url },
        };
      });

      //console.log(filteredData);
      setAPIData(filteredData);
      setTotalCount(itemsCount);
      setAPIError(null);
    } catch (e: any) {
      let status = e.request.status;
      if (status === 403) setAPIError("API rate limit exceeded.");
      else if (status === 422) setAPIError("Given user is not found");
      else if (status === 503) setAPIError("API service is unavialable");
    }
  };

  const clearForm = () => {
    setInputsValue(initialInputsValue);
  };

  return (
    <div className={styles.container}>
      <Hero />
      <Form
        error={APIError}
        inputsValue={inputsValue}
        options={options}
        storagePath={filtersPath}
        onValidation={handleData}
        setCurrentPage={setCurrentPage}
        setDefaultValues={clearForm}
        setInputsValue={setInputsValue}
      />
      <hr />
      {APIData && !APIError && (
        <>
          {APIData.length === 0 ? (
            <p className={styles.noResults}>Nie znaleziono wyników...</p>
          ) : (
            <>
              <SearchResults apiData={APIData} setModalAvatarPath={setModalAvatarPath} />
              <Pagination
                currentPage={currentPage}
                getData={handleData}
                perPage={resultsPerPage}
                resultsCount={totalCount}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </>
      )}

      {modalAvatarPath && <ImageModal img_url={modalAvatarPath} setModalAvatarPath={setModalAvatarPath} />}
    </div>
  );
}

export default HomePage;
