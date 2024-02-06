import React, { useState } from "react";

import { ReactComponent as Email } from "../../assets/svg/email_Icon.svg";
import { ReactComponent as PasswordIcon } from "../../assets/svg/password_icon.svg";

const Input = ({ type, label, ...restProps }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShow = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      {type === "email" && (
        <div className="flex flex-col">
          <label className="font-medium text-xl mb-2">{label}</label>
          <div className="relative w-full flex items-center">
            <input
              type="email"
              className="outline-none outline-0 bg-[#EEF1FF] rounded-md h-14 border-none px-4 w-full"
              {...restProps}
            />
            <span className="absolute right-4">
              <Email />
            </span>
          </div>
        </div>
      )}
      {type === "password" && (
        <div className="flex flex-col">
          <label className="font-medium text-xl mb-2">{label}</label>
          <div className="relative w-full flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              className="outline-none outline-0 bg-[#EEF1FF] rounded-md h-14 border-none px-4 w-full"
              {...restProps}
            />
            <span className="absolute right-4 cursor-pointer" onClick={toggleShow}>
              <PasswordIcon />
            </span>
          </div>
        </div>
      )}
      {type === "text" && (
        <div className="flex flex-col">
          <label className="font-medium text-xl mb-2">{label}</label>
          <input
            type="text"
            className="outline-none outline-0 bg-[#EEF1FF] rounded-md h-14 border-none px-4"
            {...restProps}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
