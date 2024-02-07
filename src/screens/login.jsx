import React from "react";
import { ReuseBox } from "./register";
import loginBg from "../assets/login-bg.png";
import loginHero from "../assets/login-hero.png";
import Input from "../components/input/input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button/button";
import { useDispatch } from "react-redux";
import { login } from "../data/Reducers/UserReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login("user"));
    navigate("/");
  };
  return (
    <div>
      <ReuseBox
        bg={loginBg}
        hero={loginHero}
        heading={"Welcome Back, Annie!"}
        subtext={"Log in to your account to manage your projects efficiently"}
      >
        <div className="font-koho">
          <h1 className="text-4xl font-bold text-center mb-16">
            Welcome back to{" "}
            <span className="font-black text-[#BBE809]">DOXA!</span>
          </h1>
          <form className="space-y-8">
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
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <input type="checkbox" className="bg-[#EEF1FF]" />
                <label>Remember me</label>
              </div>
              <span className="font-bold underline">
                <Link to={"/reset-password"}>Forgot password?</Link>
              </span>
            </div>
            <div className="flex justify-center mt-8">
              <Button text={"Register"} handleButton={handleLogin} />
            </div>
          </form>
          <div className="mt-12 text-center">
            Don't have an account?{" "}
            <span className="font-bold">
              <Link to={"/register"}>Create Account</Link>
            </span>
          </div>
        </div>
      </ReuseBox>
    </div>
  );
};

export default Login;
