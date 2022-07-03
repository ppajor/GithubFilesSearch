//import React from "react";
import { ChangeEvent } from "react";
import styles from "./CustomInput.module.scss";

interface Props {
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  select?: boolean;
  options?: Array<{
    name: string;
    value: string;
  }> | null;
}

function CustomInput({ label, name, value, onChange, placeholder, select = false, options = null }: Props) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      {select ? (
        <select name={name} value={value} onChange={(e) => onChange(e)}>
          {options?.map((el, idx) => (
            <option key={idx} value={el.value}>
              {el.name}
            </option>
          ))}
        </select>
      ) : (
        <input name={name} placeholder={placeholder} value={value} onChange={(e) => onChange(e)} required />
      )}
    </div>
  );
}

export default CustomInput;
