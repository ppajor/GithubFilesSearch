import React, { ChangeEvent, useState } from "react";
import { produce } from "immer";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import styles from "./Form.module.scss";

type State = {
  phrase: {
    value: string;
    error: boolean;
  };
  user: {
    value: string;
    error: boolean;
  };
  language: {
    value: string;
  };
};

const options = [
  { name: "go", value: "go" },
  { name: "java", value: "java" },
  { name: "javascript", value: "javascript" },
];

const initialInputsValue = {
  phrase: { value: "", error: false },
  user: {
    value: "",
    error: false,
  },
  language: {
    value: options[0].value,
  },
};

function Form() {
  const [inputsValue, setInputsValue] = useState<State>(initialInputsValue);
  const [formError, setFormError] = useState<string | null>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputsValue({ ...inputsValue, [e.target.name]: { value: e.target.value, error: false } });
  };

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    formValidation();
  };

  const formValidation = () => {
    if (inputsValue.phrase.value === "" || inputsValue.user.value === "") {
      setFormError("Text field cannot be empty");
      //jesli któryś input pusty zaznaczamy error na true
      if (!inputsValue.phrase.value)
        setInputsValue(
          produce((draft) => {
            draft.phrase.error = true;
          })
        );
      if (!inputsValue.user.value)
        setInputsValue(
          produce((draft) => {
            draft.user.error = true;
          })
        );
    } else if (formError) setFormError(null);
  };

  return (
    <form>
      <CustomInput
        name="phrase"
        label="phrase"
        value={inputsValue.phrase.value}
        placeholder="search phrase..."
        error={inputsValue.phrase.error}
        onChange={(e) => handleOnChange(e)}
      />
      <CustomInput
        name="user"
        label="user"
        value={inputsValue.user.value}
        placeholder="search user..."
        error={inputsValue.user.error}
        onChange={(e) => handleOnChange(e)}
      />
      <CustomInput
        name="language"
        label="programming language"
        placeholder="select language"
        value={inputsValue.language.value}
        select={true}
        options={options}
        onChange={(e) => handleOnChange(e)}
      />
      {formError ? <p className={styles.error}>{formError}</p> : null}
      <CustomButton value="Search file" onClick={(e) => handleOnClick(e)} />
    </form>
  );
}

export default Form;
