import React, { ChangeEvent, useState } from "react";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

interface Props {
  onValidation: (form_phrase: string, form_user: string, form_language: string) => void;
}

interface State {
  phrase: string;
  user: string;
  language: string;
}

const options = [
  { name: "go", value: "go" },
  { name: "java", value: "java" },
  { name: "javascript", value: "javascript" },
];

const params = new URLSearchParams(window.location.search);

const initialInputsValue = {
  phrase: params.get("phrase") || "",
  user: params.get("user") || "",
  language: params.get("language") || options[0].value,
};

function Form({ onValidation }: Props) {
  const [inputsValue, setInputsValue] = useState<State>(initialInputsValue);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputsValue({ ...inputsValue, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onValidation(inputsValue.phrase, inputsValue.user, inputsValue.language);
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
      <CustomButton value="Search file" />
    </form>
  );
}

export default Form;
