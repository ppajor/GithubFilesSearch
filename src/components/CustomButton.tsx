//import React from "react";
import styles from "./CustomButton.module.scss";

interface Props {
  value: string;
}

function CustomButton({ value }: Props) {
  return (
    <button className={styles.btn} type="submit">
      {value}
    </button>
  );
}

export default CustomButton;
