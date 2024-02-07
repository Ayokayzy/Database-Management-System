import React, { useState } from "react";
import Nav from "../components/nav/nav";

import { FaLongArrowAltRight } from "react-icons/fa";
import TestimonialCard from "../components/testimonial-card/testimonial-card";
import Footer from "../components/footer/footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goTo = (route) => {
    navigate(route);
  };
  return (
    <>
      <header id="home" className="bg-main pb-40 md:pb-96">
        <Nav />
        <div className="text-center">
          <div className="relative w-fit p-4 py-2 text-white mx-auto text-xs font-medium">
            <div className="absolute inset-0 opacity-30 bg-main rounded-full border border-white"></div>
            <span className="font-karla">
              DOXA Database Management System
            </span>
          </div>
          <article className="mt-8">
            <h1 className="lg:text-5xl leading-relaxed font-koho font-bold text-white max-w-2xl mx-auto">
              Elevate your data management with our sophisticated DBMS
            </h1>
            <p className="font-karla font-thin text-white max-w-xl mx-auto text-xl mt-8">
              Dive into our Database Management System for a transformative
              experience in data organization and retrieval.
            </p>
          </article>
          <div className="my-8">
            <button
              className="bg-white text-black h-10 px-8 rounded-full capitalize font-bold font-karla text-xl"
              onClick={() => goTo("/register")}
            >
              Get started
            </button>
          </div>
        </div>
      </header>
      <div className="">
        <img
          src={require("../assets/hero.png")}
          alt=""
          className="mx-auto -mt-40 md:-mt-96"
        />
      </div>
      <section id="about" className="container mx-auto p-4 mt-16">
        <h1 className="font-karla font-bold text-4xl text-center">
          Trusted by companies like
        </h1>
        <div className="mt-8 flex justify-center gap-40 items-center">
          <i>
            <img src={require("../assets/companies/comp-2.png")} alt="" />
          </i>
          <i>
            <img src={require("../assets/companies/comp-3.png")} alt="" />
          </i>
          <i>
            <img src={require("../assets/companies/comp-4.png")} alt="" />
          </i>
          <i>
            <img src={require("../assets/companies/comp-5.png")} alt="" />
          </i>
          <i>
            <img src={require("../assets/companies/comp-6.png")} alt="" />
          </i>
          <i>
            <img src={require("../assets/companies/comp-1.png")} alt="" />
          </i>
        </div>
      </section>
      <section className="container mx-auto p-4 mt-24 font-koho">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="self-center order-2 md:order-1">
            <h3 className="font-semibold text-4xl mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h3>
            <p className="mb-4 text-xl text-[#58595D]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              odio pellentesque pellentesque a. Amet ut lobortis pellentesque a,
              luctus maecenas.
            </p>
            <p className="mb-4 text-xl text-[#58595D]">
              Feugiat sed enim vitae viverra cras tristique eu. Pellentesque
              bibendum volutpat metus, dictum.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img src={require("../assets/grid-1.png")} alt="" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="">
            <img src={require("../assets/grid-2.png")} alt="" />
          </div>
          <div className="self-center">
            <h1 className="font-extrabold text-5xl md:text-6xl mb-8">
              How DOXA DBMS Works
            </h1>
            <p className="mb-8 text-xl text-[#58595D]">
              Lorem ipsum dolor sit amet consectetur. Nulla blandit urna
              ultricies feugiat non morbi luctus malesuada. Etiam massa.
            </p>
            <div className="flex justify-between flex-wrap">
              <article className="m max-w-fit"> 
                <h1 className="text-3xl md:text-4xl font-black">1468%</h1>
                <p className="mb-4 text-lg text-[#58595D] font-karla font-semibold">
                  ROI
                </p>
              </article>
              <article className="m max-w-fit">
                <h1 className="text-3xl md:text-4xl font-black">35%</h1>
                <p className="mb-4 text-lg text-[#58595D] font-karla font-semibold">
                  Growth
                </p>
              </article>
              <article className="m max-w-fit">
                <h1 className="text-3xl md:text-4xl font-black">20,000</h1>
                <p className="mb-4 text-lg text-[#58595D] font-karla font-semibold">
                  Users
                </p>
              </article>
            </div>
            <div className="mt-8">
              <button
                className="bg-[#1408A0] border border-[#4262FF] text-white h-12 px-8 rounded-full capitalize font-karla text-xl flex items-center gap-2"
                onClick={() => goTo("/register")}
              >
                <span>Sign up free</span>
                <span>
                  <FaLongArrowAltRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-24 font-koho bg-[#F2FDFF] py-8">
        <div className="container mx-auto p-4">
          <h1 className="font-bold uppercase text-4xl">Testimonials</h1>
        </div>
        <div className="px-16 md:px-32 overflow-x-auto p-4 flex items-center gap-8 scrollbar-hide">
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </div>
      </section>
      <section className="container mx-auto p-4 mt-24 font-koho">
        <h1 className="text-5xl text-center font-black">
          DOXA Unlimited Benefits
        </h1>
        <div className="mt-8 flex justify-center gap-16 flex-wrap">
          <div className="max-w-sm">
            <h3 className="text-3xl font-black">Affordable and Reliable</h3>
            <p className="f text-lg text-[#1B1B1B99] mt-4 font-medium">
              Our free plan gives you unlimited team members, 3 boards, and 300+
              expert-made templates. Signing up with your work email lets you
              bring in your team faster. See our <br />
              <span className="text-[#BBE809]">pricing plans </span>
              for more features.
            </p>
          </div>
          <div className="max-w-sm">
            <h3 className="text-3xl font-black">Affordable and Reliable</h3>
            <p className="f text-lg text-[#1B1B1B99] mt-4 font-medium">
              Our free plan gives you unlimited team members, 3 boards, and 300+
              expert-made templates. Signing up with your work email lets you
              bring in your team faster. See our <br />
              <span className="text-[#BBE809]">pricing plans </span>
              for more features.
            </p>
          </div>
          <div className="max-w-sm">
            <h3 className="text-3xl font-black">Affordable and Reliable</h3>
            <p className="f text-lg text-[#1B1B1B99] mt-4 font-medium">
              Our free plan gives you unlimited team members, 3 boards, and 300+
              expert-made templates. Signing up with your work email lets you
              bring in your team faster. See our <br />
              <span className="text-[#BBE809]">pricing plans </span>
              for more features.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button
            className="bg-[#1408A0] border border-[#4262FF] text-white h-12 px-8 rounded-full capitalize font-karla text-xl flex items-center gap-2"
            onClick={() => goTo("/register")}
          >
            <span>Sign up free</span>
            <span>
              <FaLongArrowAltRight />
            </span>
          </button>
        </div>
      </section>
      <section className="container mx-auto p-4 mt-24 font-koho">
        <div className="bg-[#1408A0] p-8 rounded-xl">
          <h1 className="text-5xl text-center font-black text-white">
            Join 10M+ users today
          </h1>
          <p className="font-light text-xl text-white mt-8 text-center max-w-lg mx-auto">
            Start for free — upgrade anytime. Discover a new era of database
            management. Embrace efficiency, embrace excellence.
          </p>
          <div className="flex justify-center mt-12">
            <button
              className="bg-white border border-[#FFC000] h-12 px-8 rounded-full capitalize font-karla text-xl flex items-center gap-2"
              onClick={() => goTo("/register")}
            >
              <span>Sign up free</span>
              <span>
                <FaLongArrowAltRight />
              </span>
            </button>
          </div>
        </div>
      </section>
      <section className="container mx-auto p-4 mt-24 font-karla mb-16">
        <h1 className="text-5xl text-center font-black">Contact Us</h1>
        <p className="text-xl mt-8 text-center max-w-3xl mx-auto">
          We are always open to discuss new value-adding partnerships. Do reach
          out if you are an exchange or a project looking for liquidity; an
          algorithmic trader or a software developer looking to improve the
          markets with us or just have a great idea you can’t wait to share with
          us!
        </p>
        <div className="flex justify-center mt-8">
          <button
            className="bg-[#BBE809] uppercase font-semibold h-12 px-8 rounded-2xl font-karla text-2xl"
            onClick={() => goTo("/register")}
          >
            Get in touch
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
