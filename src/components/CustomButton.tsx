import React from "react";
import "./CustomButton.module.scss";

type Props = {
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function CustomButton({ onClick, value }: Props) {
  return <button onClick={(e) => onClick(e)}>{value}</button>;
}

export default CustomButton;
