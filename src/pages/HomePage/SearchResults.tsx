import { useState, useEffect } from "react";
import styles from "./SearchResults.module.scss";
import { AiOutlineArrowRight } from "react-icons/ai";

interface Item {
  //ogarnąć 'how to pass' interface przez propsy
  url: string;
  fileName: string;
  repo: { name: string; description: string | null };
  user: { name: string; avatar: string };
}

interface Props {
  setModalAvatarPath: (url: string) => void;
  apiData: {
    resultsCount: number;
    items: Item[];
  };
}

function SearchResults({ apiData, setModalAvatarPath }: Props) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleWindowsSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowsSizeChange);
    };
  }, []);

  const handleWindowsSizeChange = () => {
    setWindowWidth(window.innerWidth);
  };
  //let rowsCount = apiData.resultsCount;
  let rows = apiData.items;
  const { avatar, name } = apiData.items[0].user;

  const handleUserClick = (avatarPath: string) => {
    setModalAvatarPath(avatarPath);
    document.body.style.overflow = "hidden"; //prevent scroll when modal is open
  };

  const DesktopLayout = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>File</th> <th>Repository</th> <th>User</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((el, idx) => (
            <tr key={idx}>
              <th>
                <a href={el.url}>{el.fileName} </a>
              </th>

              <td className={styles.container_card_body_description}>
                <span className={styles.container_card_body_name}>{el.repo.name}</span>:
                {el.repo.description ? el.repo.description : "No description"}
              </td>
              <td className={styles.container_userFiles_username} onClick={() => handleUserClick(avatar)}>
                {el.user.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const MobileLayout = () => {
    return (
      <>
        <div className={styles.container_userFiles} onClick={() => handleUserClick(avatar)}>
          <img src={avatar} alt="avatar" />
          <span className={styles.container_userFiles_username}>
            {name}
            {"'s"}
          </span>
          <span>files...</span>
        </div>
        {rows.map((el, idx) => (
          <div key={idx} className={styles.container_card}>
            <div className={styles.container_card_topBar}>
              <a href={el.url}>
                <h2>{el.fileName}</h2>
              </a>
            </div>
            <p className={styles.container_card_body}>
              <span className={styles.container_card_body_name}>{el.repo.name}</span>:{" "}
              <span className={styles.container_card_body_description}>
                {el.repo.description ? el.repo.description : "No description"}
              </span>
            </p>
            <div className={styles.container_card_bottomBar}>
              <a href={el.url}>
                <p>Go to repo</p>
                <AiOutlineArrowRight />
              </a>
            </div>
          </div>
        ))}
      </>
    );
  };

  return <div className={styles.container}>{windowWidth < 834 ? MobileLayout() : DesktopLayout()}</div>;
}

export default SearchResults;
