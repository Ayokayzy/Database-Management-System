import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

import { BiSearch, BiArrowBack } from "react-icons/bi";

import Profile from "../profile/profile";
import { useContext } from "react";
import { GlobalState } from "../../data/Context";
import Button from "../button/button";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../data/selectors/userSelector";

const DefaultHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useContext(GlobalState);
  const user = useSelector(selectCurrentUser);
  return (
    <div className="mb-8 bg-white mx-4 py-2">
      <div className="my-8 flex items-center justify-between gap-8 px-4 flex-wrap">
        <div className="">
          <h3 className="text-2xl font-semibold capitalize">
            Welcome Back, {user?.admin ? "admin" : "user"}!
          </h3>
          <p className="text-sm font-light">Glad to see you again</p>
        </div>
        <div className="flex justify-between gap-8 w-full">
          <div className="flex items-center gap-4">
            <div className="search flex items-center w-fit px-4 rounded-md border">
              <span>
                <BiSearch />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="md:w-80 outline-none bg-transparent border-none font-light text-sm h-10 px-2"
              />
            </div>
          </div>
          <div className="profile flex items-center gap-4">
            <div>
              <Profile />
            </div>
          </div>
        </div>
        <div className="flex w-fit gap-x-2 items-center" onClick={() => navigate(-1)}>
          <span className="text-xl">
            <IoMdArrowRoundBack />
          </span>
          <p>Go Back</p>
        </div>
      </div>
    </div>
  );
};

export default DefaultHeader;
