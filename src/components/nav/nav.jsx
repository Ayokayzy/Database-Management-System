import { Link, Outlet, useNavigate } from "react-router-dom";
import Brand from "../brand/brand";

import ScrollIntoView from "react-scroll-into-view";
import { FaAlignLeft } from "react-icons/fa";
import { useState } from "react";

const routes = [
  { name: "Home", link: "#home" },
  { name: "About Us", link: "#about" },
];

const Nav = () => {
  const [nav, setNav] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const [toTop, setToTop] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };

  const navigate = useNavigate();
  console.log();

  window.onscroll = () => {
    window.scrollY > 400 ? setNavBg(true) : setNavBg(false);
  };

  return (
    <div>
      <div className="py-6">
        <div
          className={`${
            navBg && "bg-white shadow-md"
          } fixe inset-x-0 top-0 z-40 h-20`}
        >
          <nav className="container px-4 mx-auto py-4 flex items-center justify-between">
            <div className="logo">
              <Brand white height={"h-12s"} />
            </div>
            <div className="menu md:flex gap-x-12 hidden capitalize text-white">
              {routes.map((route) => (
                <ScrollIntoView selector={route.link}>
                  <span className="cursor-pointer">{route.name}</span>
                </ScrollIntoView>
              ))}
            </div>
            <div className="action hidden md:block">
              <button className="bg-white text-black h-10 px-8 rounded-full capitalize">
                login
              </button>
            </div>
            <span
              className={`md:hidden ${nav && "hidden"}`}
              onClick={toggleNav}
            >
              <FaAlignLeft size={"20px"} />
            </span>
          </nav>

          {/* mobile nav */}
          <div
            className={`fixed left-0 top-0 bottom-0 w-96 ${
              !nav && "-ml-96"
            } md:hidden`}
          >
            <nav className={`bg-white z-50 relative h-full`}>
              <div className="p-8">
                <div className="flex justify-between items-center">
                  <Brand />
                  <span onClick={toggleNav}>
                    <FaAlignLeft size={"20px"} />
                  </span>
                </div>
                <div className="mt-10">
                  <div className="menu grid gap-8 uppercase">
                    {routes.map((route) => (
                      <ScrollIntoView selector={route.link} onClick={toggleNav}>
                        {route.name}
                      </ScrollIntoView>
                    ))}
                  </div>
                  <div className="action mt-10">
                    <button className="bg-white text-black h-10 px-8 rounded-full capitalize">
                      login
                    </button>
                  </div>
                </div>
              </div>
            </nav>
            <div
              className={`fixed inset-0 z-10 ${!nav && "hidden"}`}
              onClick={toggleNav}
            ></div>
          </div>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Nav;
