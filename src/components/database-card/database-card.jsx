import React from "react";

const DatabaseCard = ({ children, handleClick }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-xl bg-white relative cursor-pointer">
      <div className="absolute inset-0" onClick={handleClick}></div>
      <div className="h-4 bg-[#D5FBCE]"></div>
      {children}
    </div>
  );
};

export default DatabaseCard;
