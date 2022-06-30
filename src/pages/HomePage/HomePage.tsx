import { ChangeEvent, useState } from "react";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import styles from "./HomePage.module.scss";

type State = {
  phrase: string;
  user: string;
  language: string;
};

function HomePage() {
  const options = [
    { name: "go", value: "go" },
    { name: "java", value: "java" },
    { name: "javascript", value: "javascript" },
  ];
  const [inputsValue, setInputsValue] = useState<State>({ phrase: "", user: "", language: options[0].value });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputsValue({ ...inputsValue, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_hero}>
        <h1>Search Github files easy</h1>
        <p>Select phrase, user and/or programming language and you're ready to go!</p>
      </div>
      <form>
        <CustomInput
          name="phrase"
          label="phrase"
          value={inputsValue.phrase}
          placeholder="search phrase..."
          onChange={(e) => handleOnChange(e)}
        />
        <CustomInput
          name="user"
          label="user"
          value={inputsValue.user}
          placeholder="search user..."
          onChange={(e) => handleOnChange(e)}
        />
        <CustomInput
          name="language"
          label="programming language"
          placeholder="select language"
          value={inputsValue.language}
          select={true}
          options={options}
          onChange={(e) => handleOnChange(e)}
        />
        <CustomButton value="Search file" />
      </form>
    </div>
  );
}

export default HomePage;
