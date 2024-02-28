import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profilerounded from "../profile-rounded/profile-rounded";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalState } from "../../data/Context";
import { MdSettings, MdLogout } from "react-icons/md";

const Profile = () => {
  const { auth, logoutUser, sidebarAccount, profile, toggleProfile } =
    useContext(GlobalState);

  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  useEffect(() => {}, [auth.user]);
  return (
    <div className="relative">
      <button
        className="flex relative z-20 items-center text-sm font-medium gap-2 text-gray-900 rounded-full"
        type="button"
        onClick={toggleProfile}
      >
          <div className="hidden md:block text-xl text-[#4F4F4F]">{auth?.user?.firstname}</div>
        <Profilerounded sm img={auth?.user?.avatar?.url} />
      </button>

      {/* <!-- Dropdown menu --> */}
      {profile && (
        <div
          id="dropdownAvatarName"
          className="z-10 absolute mt-2 right-0 bg-white divide-y divide-gray-100 rounded-lg w-48 px-2 shadow"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
          >
            {sidebarAccount.map((item) => (
              <li
                className="flex items-center gap-2 hover:bg-gray-100 px-2"
                onClick={() => {
                  profile && toggleProfile();
                }}
              >
                <span>{item.icon}</span>
                <Link to={item.url} className="block px-4 py-2">
                  {item.name}
                </Link>
              </li>
            ))}
            <li
              className="flex items-center gap-2 hover:bg-gray-100 px-2"
              onClick={() => {
                profile && toggleProfile();
              }}
            >
              <span>
                <MdSettings size={24} />
              </span>
              <Link
                to={"/profile"}
                state={{ link: "account settings" }}
                className="block px-4 py-2"
              >
                Settings
              </Link>
            </li>
          </ul>
          <div class="py-2 flex items-center gap-2 px-2 cursor-pointer">
            <MdLogout size={24} />
            <span
              className="block px-4 py-2 text-sm text-gray-700"
              onClick={logout}
            >
              Sign out
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
