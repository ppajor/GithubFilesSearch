//import React from "react";
import { ChangeEvent } from "react";
import styles from "./CustomInput.module.scss";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  select?: boolean;
  options?: Array<{
    name: string;
    value: string;
  }> | null;
};

function CustomInput({ label, name, placeholder, value, onChange, select = false, options = null }: Props) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      {select ? (
        <select name={name} value={value} onChange={(e) => onChange(e)}>
          {options?.map((el) => (
            <option value={el.value}>{el.name}</option>
          ))}
        </select>
      ) : (
        <input name={name} placeholder={placeholder} value={value} onChange={(e) => onChange(e)} />
      )}
    </div>
  );
}

export default CustomInput;
