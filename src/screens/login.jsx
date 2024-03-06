import React, { useContext } from "react";
import { ReuseBox } from "./register";
import loginBg from "../assets/login-bg.png";
import loginHero from "../assets/login-hero.png";
import Input from "../components/input/input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button/button";
import { useDispatch } from "react-redux";
import { loadUser, login } from "../data/Reducers/UserReducer";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ModalContainer, {
  OtpComponent,
} from "../components/modal-container/modal-container";
import { GlobalState } from "../data/Context";

const defaultData = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false),
    [code, setCode] = useState(),
    [successModal, setSuccessModal] = useState(false);
  const [message, setMessage] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleSucces = () => {
    setSuccessModal(!successModal);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    let flag = 0;
    Object.keys(formData).forEach((data) => {
      if (!formData[data]) {
        flag++;
      }
    });
    if (flag > 0) {
      return toast.error("All fields are required");
    }
    setIsLoading(true);
    try {
      const res = await axios.post("/auth/login", formData);
      console.log(res);
      setIsLoading(false);
      toggleModal();
      toast.success(res.data?.message);
      dispatch(login(res.data?.data));
      dispatch(loadUser());
      navigate("/");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if (err.response?.status === 402) {
        await resendToken("verifyEmail", formData.email);
        toggleModal();
        return;
      }
      return toast.error(err.response?.data?.message);
    }
  };

  const verifyEmail = async () => {
    if (!code) return;
    setIsLoading(true);
    try {
      const res = await axios.post("/auth/verify-Email", {
        email: formData.email,
        token: code,
      });
      setIsLoading(false);
      toggleModal();
      setMessage(res.data?.message);
      toggleSucces();
      return toast.success(res.data?.message);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return toast.error(err.response?.data?.message);
    }
  };

  const resendToken = async (type, email) => {
    try {
      const res = await axios.post("/auth/request-resend-password", {
        email: email,
        type: type,
      });
      setIsLoading(false);
      return toast.success(res.data?.message);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return toast.error(err.response?.message);
    }
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
          <form className="space-y-8" onSubmit={handleLogin}>
            <Input
              type={"email"}
              label={"Email Address"}
              placeholder={"Enter your mail address"}
              name={"email"}
              value={formData.email}
              onChange={handleInput}
            />
            <Input
              type={"password"}
              label={"Password"}
              placeholder={"Enter your password"}
              name={"password"}
              value={formData.password}
              onChange={handleInput}
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
              <Button text={"Login"} loading={isLoading} />
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

      {/* modals */}
      <ModalContainer show={modal}>
        <div>
          <h3 className="text-2xl font-semibold text-center">
            Reset <span className="text-[#BBE809]">Password</span>
          </h3>
          <p className="font-karla md:text-xl mt-4 text-center mb-16">
            A 6-digit verification code has been sent to your email address.
            Enter the code to rest your password.
          </p>
          <img
            src={require("../assets/reset-img.png")}
            alt=""
            className="my-8 mx-auto"
          />
          <div className="flex flex-col gap-2 items-center justify-center">
            <p>Type in below</p>
            <OtpComponent
              stateData={code}
              textChange={(data) => {
                setCode(data);
              }}
              css="borderColor"
              loading={isLoading}
              numInputs={6}
            />
          </div>
          <div className="mt-4 text-center">
            Didn’t get the code?{" "}
            <span
              className="font-bold cursor-pointer"
              onClick={() => resendToken("verifyEmail", formData.email)}
            >
              Resend code
            </span>
          </div>
          <div className="flex justify-center my-12">
            <Button
              handleButton={verifyEmail}
              loading={isLoading}
              text={"Continue"}
              style={"w-full"}
            />
          </div>
        </div>
      </ModalContainer>
      <ModalContainer show={successModal} close={toggleSucces} width={"max-w-sm p-8"}>
        <div>
          <img
            src={require("../assets/success-icon.png")}
            alt=""
            className="mx-auto"
          />
          <p className="text-center mt-8">{message}</p>
        </div>
      </ModalContainer>
    </div>
  );
};

export default Login;
