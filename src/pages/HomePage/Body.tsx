import { useState } from "react";
import axios from "axios";

import "./Body.module.scss";
import Form from "./Form";
import SearchResults from "./SearchResults";
import ErrorMessage from "../../components/ErrorMessage";

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

interface File {
  resultsCount: number;
  items: FilteredResult[];
}

function Body() {
  const [APIData, setAPIData] = useState<File | null>(null);
  const [APIError, setAPIError] = useState<string | null>(null);

  const handleOnValidation = (phrase: string, user: string, language: string) => {
    let API_PATH = `https://api.github.com/search/code?q=${phrase}+user:${user}+language:${language}`; //trzeba spacje ogarnac
    getAPIData(API_PATH);
  };

  const getAPIData = async (path: string) => {
    try {
      const response = await axios.get(path);
      const dataItems = response.data.items;
      const itemsNumber = response.data.total_count;
      // console.log(dataItems);
      let filteredData = dataItems.map((el: ResultItem): FilteredResult => {
        return {
          url: el.html_url,
          fileName: el.name,
          repo: { name: el.repository.name, description: el.repository.description },
          user: { name: el.repository.owner.login, avatar: el.repository.owner.avatar_url },
        };
      });

      let obj: File = {
        resultsCount: itemsNumber,
        items: filteredData,
      };
      //  console.log(obj);
      setAPIData(obj);
      setAPIError(null);
    } catch (e: any) {
      let status = e.request.status;
      if (status === 403) setAPIError("API rate limit exceeded.");
      else if (status === 422) setAPIError("Given user is not found");
      else if (status === 503) setAPIError("API service is unavialable");
    }
  };

  return (
    <>
      <Form onValidation={handleOnValidation} />
      {APIError && <ErrorMessage message={APIError} />}
      <hr />
      {APIData && !APIError && <SearchResults apiData={APIData} />}
    </>
  );
}

export default Body;
