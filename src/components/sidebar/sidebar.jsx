import React, { useContext, useState } from "react";
import { GlobalState } from "../../data/Context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Brand from "../brand/brand";
// import DefaultHeader from "../default-header/default-header";
import { BiLogIn } from "react-icons/bi";
import { logout } from "../../data/Reducers/UserReducer";
// import { useState } from "react";

const Sidebar = ({ children }) => {
  const { sidebarList, nav, toggleNav, auth } = useContext(GlobalState);
  const location = useLocation(),
    navigate = useNavigate(),
    dispatch = useDispatch();

  return (
    <div className="font-koho">
      {auth?.isAuth && (
        <div>
          <button
            type="button"
            className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleNav}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <div
            className={`fixed md:hidden top-0 left-0 z-40 w-full h-screen transition-transform bg-black opacity-10 ${
              nav ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
            onClick={toggleNav}
          ></div>
        </div>
      )}
      {auth?.isAuth && (
        <aside
          className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white transition-transform ${
            nav ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="h-full px-3 py-4 overflow-y-auto scrollbar-hide">
            <div className="flex flex-col items-center gap-4">
              <Brand green />
              <p className="font-bold text-2xl">DOXA</p>
            </div>
            <ul className="space-y-2 font-medium my-16">
              {sidebarList
                .filter((list) =>
                  auth.isAdmin
                    ? list.permission.includes("admin")
                    : list.permission.includes("user")
                )
                .map((list) => (
                  <DefaultLilnk
                    name={list.name}
                    url={list.url}
                    icon={list.icon}
                  />
                ))}
            </ul>
            <div>
              <div className="absolute bottom-20 inset-x-0 py-4 space-y-4 bg-white p-4">
                <div
                  className=""
                  title="Logout"
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  <Link to="#" className="flex items-center gap-4">
                    <BiLogIn className="icon" size={24} />
                    <span className="text nav-text">Logout</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
      <div
        className={`${auth?.isAuth && "md:ml-64 bg-[#EFF3F9] min-h-screen"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Sidebar;

const DefaultLilnk = ({ name, url, icon }) => {
  return (
    <li>
      <Link
        to={url}
        className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#BBE809]"
      >
        {icon}
        <span className="flex-1 ml-3 whitespace-nowrap text-xl">{name}</span>
      </Link>
    </li>
  );
};
