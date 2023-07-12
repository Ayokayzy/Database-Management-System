import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../data/Context";

const Home = () => {
  const { sidebarList } = useContext(GlobalState);
  console.log(sidebarList);
  console.log("home");
  let navigate = useNavigate();
  useEffect(() => {
    navigate(sidebarList[0].url);
  }, [navigate]);
  return <></>;
};

export default Home;
