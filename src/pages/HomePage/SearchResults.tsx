//import React from 'react'
import styles from "./SearchResults.module.scss";

interface Item {
  //ogarnąć 'how to pass' interface przez propsy
  url: string;
  fileName: string;
  repo: { name: string; description: string | null };
  user: { name: string; avatar: string };
}

interface Props {
  apiData: {
    resultsCount: number;
    items: Item[];
  };
}

function SearchResults({ apiData }: Props) {
  //let rows = apiData.resultsCount;
  let items = apiData.items;
  console.log(items);
  return (
    <div className={styles.container}>
      {items.map((el, idx) => (
        <div key={idx} className={styles.container_card}>
          <div className={styles.container_card_topBar}>
            <a href={el.url}>
              <h2>{el.fileName}</h2>
            </a>
            <div className={styles.container_card_topBar_user}>
              <span>{el.user.name}</span>
              <img src={el.user.avatar} alt="avatar" />
            </div>
          </div>
          <p className={styles.container_card_body}>
            <span className={styles.container_card_body_name}>{el.repo.name}</span>:{" "}
            <span className={styles.container_card_body_description}>
              {el.repo.description ? el.repo.description : "No description"}
            </span>
          </p>
          <div className={styles.container_card_bottomBar}>
            <a href={el.url}>
              <span>Go to repo</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
