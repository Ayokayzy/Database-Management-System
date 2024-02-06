import React from "react";
import { Link } from "react-router-dom";
import Brand from "../components/brand/brand";
import signupBg from "../assets/sign-up-bg.png";
import signupHero from "../assets/login.png";
import Input from "../components/input/input";
import Button from "../components/button/button";

const Register = () => {
  return (
    <div>
      <ReuseBox bg={signupBg} hero={signupHero}>
        <div className="font-koho">
          <h1 className="text-4xl font-bold text-center mb-16">
            Get started on{" "}
            <span className="font-black text-[#BBE809]">DOXA!</span>
          </h1>
          <form className="space-y-8">
            <Input
              type={"text"}
              label={"Full Name"}
              placeholder={"Enter your full name"}
            />
            <Input
              type={"email"}
              label={"Email Address"}
              placeholder={"Enter your mail address"}
            />
            <Input
              type={"password"}
              label={"Password"}
              placeholder={"Enter your password"}
            />
            <div className="flex items-center gap-x-2">
              <input type="checkbox" className="bg-[#EEF1FF]" />
              <label>I agree the privacy policy of vista</label>
            </div>
            <div className="flex justify-center mt-8">
              <Button text={"Register"} />
            </div>
          </form>
          <div className="mt-12 text-center">
            Already have an account?{" "}
            <span className="font-bold">
              <Link to={"/login"}>Log In</Link>
            </span>
          </div>
        </div>
      </ReuseBox>
    </div>
  );
};

export default Register;

export const ReuseBox = ({ children, bg, hero }) => {
  return (
    <div className="grid md:grid-cols-2 h-screen relative z-10">
      <div className="relative col-spa-2">
        <div className="absolute inset-0 -top-20 overflow-hidden">
          <img src={bg} alt="" className="w-full object-left" />
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center p-8 mt-16">
          <div className="flex flex-col items-center gap-4 text-white">
            <Brand green />
            <p className="font-bold text-2xl">DOXA</p>
          </div>
          <article className="text-white text-center mt-16">
            <h1 className="text-4xl md:text-5xl font-karla font-bold">
              Welcome to Pitch <span className="font-black">DOXA!</span>
            </h1>
            <p className="font-karla max-w-sm md:text-xl mx-auto mt-12">
              Register to gain access to your personalised and matchless
              database system
            </p>
          </article>
          <img src={hero} alt="" className="mt-16" />
        </div>
      </div>
      <div className="md:h-full md:w-full bg-white shadow-lg rounded-t-2xl  md:rounded-tr-none md:rounded-l-2xl py-8 overflow-auto col-spa-3 p-8 md:p-16">
        {children}
      </div>
    </div>
  );
};
