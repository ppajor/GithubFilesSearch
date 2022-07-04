import { useEffect, useState } from "react";
import styles from "./Pagination.module.scss";

interface Props {
  currentPage: number;
  getData: (pageNum: number) => void;
  perPage: number;
  resultsCount: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({ currentPage, getData, perPage, resultsCount, setCurrentPage }: Props) {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    let initPage = 1;
    let numbers: number[] = [];

    for (let i = 1; i < resultsCount; i += perPage) {
      numbers.push(initPage++);
    }
    // console.log(numbers);
    setPageNumbers(numbers);
  }, [resultsCount]);

  const handlePageClick = (number: number) => {
    setCurrentPage(number);
    getData(number);
  };

  return (
    <div className={styles.container}>
      <ul>
        {pageNumbers.map((num, idx) => (
          <a key={idx} href="#" onClick={() => handlePageClick(num)}>
            <li className={`${currentPage === num && styles.active}`}>{num}</li>
          </a>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
