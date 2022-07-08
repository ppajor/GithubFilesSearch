import "./Form.module.scss";
import React, { ChangeEvent } from "react";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import ErrorMessage from "../../components/ErrorMessage";

interface Props {
  error: string | null;
  inputsValue: Inputs;
  onValidation: () => void;
  options: Option[];
  setInputsValue: React.Dispatch<React.SetStateAction<Inputs>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

interface Option {
  name: string;
  value: string;
}

interface Inputs {
  phrase: string;
  user: string;
  language: string;
}

function Form({ error, inputsValue, onValidation, options, setInputsValue, setCurrentPage }: Props) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputsValue({ ...inputsValue, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setCurrentPage(1);
    onValidation();
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
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
        value={inputsValue.language}
        select={true}
        options={options}
        onChange={(e) => handleOnChange(e)}
      />

      {error && <ErrorMessage message={error} />}
      <CustomButton value="Search file" />
    </form>
  );
}

export default Form;
