import React from "react";

import { IoStar } from "react-icons/io5";

const TestimonialCard = () => {
  return (
    <div
      className="p-4 rounded-2xl bg-white shadow-lg font-karla"
    //   style={{ width: "24rem" }}
    >
      <div className="w-80">
        <div className="flex gap-4 text-secondary text-2xl">
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
        </div>
        <p className="mt-8">
          Does exactly what it says. Clear to read and understand. This is now
          the second iPhone we’ve used it on and would certainly recommend this
          app.
        </p>
        <p className="font-bold text-[#02033B] mt-8">Ella A. George</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
