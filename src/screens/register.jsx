import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Brand from "../components/brand/brand";
import signupBg from "../assets/sign-up-bg.png";
import signupHero from "../assets/login.png";
import Input from "../components/input/input";
import Button from "../components/button/button";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ModalContainer, {
  OtpComponent,
} from "../components/modal-container/modal-container";

const defaultData = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  phone: "",
};

const Register = () => {
  const [formData, setFormData] = useState(defaultData);
  const [modal, setModal] = useState(false),
    [code, setCode] = useState(),
    [successModal, setSuccessModal] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

  const register = async (e) => {
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
      const res = await axios.post("/auth/signup", formData);
      setIsLoading(false);
      toggleModal();
      return toast.success(res.message);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
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
      setMessage(res.message);
      toggleSucces();
      return toast.success(res.data?.message);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return toast.error(err.response?.data?.message);
    }
  };
  const resendToken = async () => {
    try {
      const res = await axios.post("/auth/request-resend-password", {
        email: formData.email,
        type: "verifyEmail",
      });
      setIsLoading(false);
      return toast.success(res.data?.message);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return toast.error(err.response?.data?.message);
    }
  };
  return (
    <div>
      <ReuseBox
        bg={signupBg}
        hero={signupHero}
        heading={
          <p>
            Welcome to Pitch <span className="font-black">DOXA!</span>
          </p>
        }
        subtext={
          "Register to gain access to your personalised and matchless database system"
        }
      >
        <div className="font-koho">
          <h1 className="text-4xl font-bold text-center mb-16">
            Get started on{" "}
            <span className="font-black text-[#BBE809]">DOXA!</span>
          </h1>
          <form className="space-y-8" onSubmit={register}>
            <Input
              type={"text"}
              label={"First Name"}
              placeholder={"Enter your first name"}
              value={formData.firstname}
              name={"firstname"}
              onChange={handleInput}
            />
            <Input
              type={"text"}
              label={"Last Name"}
              placeholder={"Enter your last name"}
              value={formData.lastname}
              name={"lastname"}
              onChange={handleInput}
            />
            <Input
              type={"tel"}
              label={"Phone Number"}
              placeholder={"Enter your mail address"}
              value={formData.phone}
              name={"phone"}
              onChange={handleInput}
            />
            <Input
              type={"email"}
              label={"Email Address"}
              placeholder={"Enter your mail address"}
              value={formData.email}
              name={"email"}
              onChange={handleInput}
            />
            <Input
              type={"password"}
              label={"Password"}
              placeholder={"Enter your password"}
              value={formData.password}
              name={"password"}
              onChange={handleInput}
            />
            <div className="flex items-center gap-x-2">
              <input type="checkbox" className="bg-[#EEF1FF]" />
              <label>I agree the privacy policy of vista</label>
            </div>
            <div className="flex justify-center mt-8">
              <Button text={"Register"} type="submit" loading={isLoading} />
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
            <span className="font-bold cursor-pointer" onClick={resendToken}>
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
      <ModalContainer show={successModal} width={"max-w-sm p-8"}>
        <div>
          <img
            src={require("../assets/success-icon.png")}
            alt=""
            className="mx-auto"
          />
          <p className="text-center mt-8">{message}</p>
          <div className="flex justify-center py-4">
            <Button
              handleButton={() => navigate("/login")}
              text={"Login"}
              style={"w-full"}
            />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default Register;

export const ReuseBox = ({ children, bg, hero, heading, subtext }) => {
  return (
    <div className="grid md:grid-cols-2 h-screen relative z-10 overflow-auto">
      <div className="relative col-spa-2 h-full">
        <div className="absolute inset-0 -top-20 overflow-hidden h-full">
          <img src={bg} alt="" className="w-full  object-cover object-left" />
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center p-8 mt-16">
          <div className="flex flex-col items-center gap-4 text-white">
            <Brand green />
            <p className="font-bold text-2xl">DOXA</p>
          </div>
          <article className="text-white text-center mt-16">
            <h1 className="text-4xl md:text-5xl font-karla font-bold">
              {heading}
            </h1>
            <p className="font-karla max-w-sm md:text-xl mx-auto mt-12">
              {subtext}
            </p>
          </article>
          <img src={hero} alt="" className="mt-16 hidden md:block" />
        </div>
      </div>
      <div className="md:w-full bg-white shadow-lg rounded-t-2xl  md:rounded-tr-none md:rounded-l-2xl col-spa-3 p-8 md:p-16">
        {children}
      </div>
    </div>
  );
};
