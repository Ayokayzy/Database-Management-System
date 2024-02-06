import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({text}) => {
  const navigate = useNavigate();
  return (
    <button
      className="bg-[#BBE809] uppercase font-semibold h-12 px-8 rounded-xl font-karla text-lg"
      onClick={() => navigate("/register")}
    >
      {text}
    </button>
  );
};

export default Button;
