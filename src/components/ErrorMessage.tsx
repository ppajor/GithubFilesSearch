import styles from "./ErrorMessage.module.scss";

function ErrorMessage({ message }: { message: string }) {
  return <p className={styles.error}>{message}</p>;
}

export default ErrorMessage;
