//import React from 'react'
import styles from "./ImageModal.module.scss";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  img_url: string;
  setModalAvatarPath: (url: null) => void;
}

function ImageModal({ img_url, setModalAvatarPath }: Props) {
  const handleCloseClick = () => {
    setModalAvatarPath(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div className={styles.container}>
      <img src={img_url} alt="avatar_modal" />
      <div className={styles.container_exit} onClick={handleCloseClick}>
        <AiOutlineClose />
      </div>
    </div>
  );
}

export default ImageModal;
