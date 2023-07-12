/* eslint-disable react/prop-types */
import { createContext } from "react";
import { BiCategoryAlt, BiBook, BiBookReader } from "react-icons/bi";
import { RxPencil2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useState } from "react";

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
      icon: <BiCategoryAlt className="icon" size={24} />,
      permission: ["admin", "user", "organisation", "superadmin"],
    },
    {
      name: "Employee",
      url: "/",
      icon: <BiBook className="icon" size={24} />,
      links: [
        { name: "Directory", url: "/directory" },
        { name: "Profile", url: "/profile" },
        { name: "Audit", url: "/audit" },
        { name: "Onboarding", url: "/onboarding" },
        { name: "Offbaording", url: "/offboarding" },
      ],
      type: "button",
      permission: ["user", "organisation"],
    },
    {
      name: "Engagement",
      url: "/",
      icon: <BiBook className="icon" size={24} />,
      links: [
        { name: "Announcements", url: "/announcements" },
        { name: "Survey", url: "/survey" },
        { name: "Feedback", url: "/audit" },
        { name: "Onboarding", url: "/feedback" },
      ],
      type: "button",
      permission: ["user", "organisation"],
    },
    {
      name: "Leave",
      url: "/leave",
      icon: <BiCategoryAlt className="icon" size={24} />,
      permission: ["admin", "user", "organisation", "superadmin"],
    },
    {
      name: "Finance",
      url: "/",
      icon: <BiBook className="icon" size={24} />,
      links: [
        { name: "Payroll", url: "/payroll" },
        { name: "Invoice", url: "/invoice" },
      ],
      type: "button",
      permission: ["user", "organisation"],
    },
    {
      name: "Recruitment",
      url: "/",
      icon: <BiBook className="icon" size={24} />,
      links: [
        { name: "Sub Menu", url: "/sub-menu" },
        { name: "Sub Menu", url: "/sub-menu" },
        { name: "Sub Menu", url: "/sub-menu" },
        { name: "Sub Menu", url: "/sub-menu" },
      ],
      type: "button",
      permission: ["user", "organisation"],
    },
    {
      name: "Request",
      url: "/",
      icon: <BiBook className="icon" size={24} />,
      links: [
        { name: "Sub Menu", url: "/sub-menu" },
        { name: "Sub Menu", url: "/sub-menu" },
        { name: "Sub Menu", url: "/sub-menu" },
        { name: "Sub Menu", url: "/sub-menu" },
      ],
      type: "button",
      permission: ["user", "organisation"],
    },
    {
      name: "Performance",
      url: "/",
      icon: <BiBook className="icon" size={24} />,
      links: [
        { name: "Sub Menu", url: "/sub-menu" },
        { name: "Sub Menu", url: "/sub-menu" },
        { name: "Sub Menu", url: "/sub-menu" },
        { name: "Sub Menu", url: "/sub-menu" },
      ],
      type: "button",
      permission: ["user", "organisation"],
    },
  ];

  const state = {
    handleCapitalize,

    numberWithCommas,

    sidebarList,
    auth,
    nav,
    toggleNav,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default DataProvider;
