import React from "react";

import { FaFacebookF } from "react-icons/fa";

const FootIcon = ({ icon }) => {
  return (
    <div className="text-white text-2xl hover:bg-[#BBE809] bg-[#363B4766] w-fit p-4 cursor-pointer">
      {icon || <FaFacebookF />}
    </div>
  );
};

export default FootIcon;
