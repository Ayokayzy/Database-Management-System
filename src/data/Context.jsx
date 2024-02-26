/* eslint-disable react/prop-types */
import { createContext } from "react";
import { LiaHomeSolid } from "react-icons/lia";
import { MdOutlinePerson } from "react-icons/md";
import { TfiSettings } from "react-icons/tfi";
import { GoDatabase } from "react-icons/go";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

export const GlobalState = createContext();

const DataProvider = ({ children }) => {
  const [nav, setNav] = useState(false);
  let handleCapitalize = (word) => {
    let splitter = word.trim().split(" ");
    let firstCap = splitter[0].split("");
    let remaining = splitter.slice(1, splitter.length).join(" ");

    let firstCapOne = firstCap[0].toUpperCase();
    let firstCapTwo = firstCap.slice(1, firstCap.length).join("");

    let joinFirst = `${firstCapOne}${firstCapTwo}`;

    return `${joinFirst} ${remaining}`;
  };

  let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const toggleNav = () => {
    setNav(!nav);
  };

  let { auth } = useSelector((state) => state);

  let sidebarList = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <LiaHomeSolid size={24} />,
      permission: ["admin"],
    },
    {
      name: "All Users",
      url: "/all-users",
      icon: <MdOutlinePerson className="icon" size={24} />,
      permission: ["admin"],
    },
    {
      name: "Databases",
      url: "/databases",
      icon: <GoDatabase className="icon" size={24} />,
      permission: ["user"],
    },
    {
      name: "Account Profile",
      url: "/profile",
      icon: <TfiSettings className="icon" size={24} />,
      permission: ["admin", "user"],
    },
  ];

  const resendToken = async (type, email) => {
    const res = await axios.post("/auth/request-resend-password", {
      email: email,
      type: type,
    });
    return res;
  };

  const state = {
    handleCapitalize,

    numberWithCommas,

    sidebarList,
    auth,
    nav,
    toggleNav,
    resendToken,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default DataProvider;
