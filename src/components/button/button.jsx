import React from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Button = ({ text, style, handleButton, loading, ...restProps }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`bg-[#BBE809] uppercase font-semibold h-12 px-8 rounded-xl font-karla text-lg ${style}`}
      onClick={handleButton}
      disabled={loading}
      {...restProps}
    >
      {loading ? (
        <span className="text-white flex items-center justify-center w-20 mx-auto">
          <ClipLoader size={20} color="#fff" />
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
