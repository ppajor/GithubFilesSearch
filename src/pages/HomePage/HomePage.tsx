import styles from "./HomePage.module.scss";
import Hero from "./Hero";
import Body from "./Body";

function HomePage() {
  return (
    <div className={styles.container}>
      <Hero />
      <Body />
    </div>
  );
}

export default HomePage;
