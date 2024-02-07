import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ text, style, handleButton }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`bg-[#BBE809] uppercase font-semibold h-12 px-8 rounded-xl font-karla text-lg ${style}`}
      onClick={handleButton ? handleButton : () => navigate("/register")}
    >
      {text}
    </button>
  );
};

export default Button;
