//import React from 'react'
import "./CustomButton.module.scss";

type Props = {
  value: string;
};

function CustomButton({ value }: Props) {
  return <button>{value}</button>;
}

export default CustomButton;
