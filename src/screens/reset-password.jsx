import React, { useState } from "react";
import { ReuseBox } from "./register";
import forgotBg from "../assets/forgot-password-bg.png";
import forgotHero from "../assets/forgot-hero.png";
import Input from "../components/input/input";
import Button from "../components/button/button";
import ModalContainer, {
  OtpComponent,
} from "../components/modal-container/modal-container";

const ResetPassword = () => {
  const [modal, setModal] = useState(false),
    [mode, setMode] = useState("otp"),
    [successModal, setSuccessModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleSucces = () => {
    setSuccessModal(!successModal);
  };
  return (
    <div>
      <ReuseBox
        bg={forgotBg}
        hero={forgotHero}
        heading={<p>Reset Password?</p>}
        subtext={"Simply reset your password to go back to your workflow."}
      >
        <div className="font-koho">
          <h1 className="text-4xl font-bold text-center">
            Reset <span className="text-[#BBE809]">Password</span>
          </h1>
          <p className="font-karla md:text-xl mt-4 text-center mb-16">
            Enter email address below to rest your password
          </p>
          <div className="space-y-16">
            <Input
              type={"email"}
              label={"Email Address"}
              placeholder={"Enter your mail address"}
            />
            <div className="flex justify-center mt-8">
              <Button
                handleButton={toggleModal}
                text={"Continue to reset"}
                style={"w-full"}
              />
            </div>
          </div>
          <p className="text-center mt-16 text-xl">
            Follow the instructions sent to your{" "}
            <span className="text-[#BBE809]">email address</span> to reset your
            password.
          </p>
        </div>
      </ReuseBox>
      {/* modal */}
      <ModalContainer show={modal} close={toggleModal}>
        {mode == "otp" && (
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
              <OtpComponent />
            </div>
            <div className="mt-4 text-center">
              Didn’t get the code?{" "}
              <span className="font-bold cursor-pointer">Resend code</span>
            </div>
            <div className="flex justify-center my-12">
              <Button
                handleButton={() => setMode("newPassword")}
                text={"Continue"}
                style={"w-full"}
              />
            </div>
          </div>
        )}
        {mode == "newPassword" && (
          <div>
            <h3 className="text-2xl font-semibold text-center">
              Reset <span className="text-[#BBE809]">Password</span>
            </h3>
            <p className="font-karla md:text-xl mt-4 text-center mb-16">
              Enter new password to reset
            </p>
            <img
              src={require("../assets/reset-img.png")}
              alt=""
              className="my-8 mx-auto"
            />
            <form className="space-y-8">
              <Input
                type={"password"}
                label={"New Password"}
                placeholder={"Enter your password"}
              />
              <Input
                type={"password"}
                label={"Confirm Password"}
                placeholder={"Enter your password"}
              />
              <div className="flex justify-center py-12">
                <Button
                  handleButton={(e) => {
                    e.preventDefault();
                    toggleSucces();
                  }}
                  text={"Continue"}
                  style={"w-full"}
                />
              </div>
            </form>
          </div>
        )}
      </ModalContainer>
      <ModalContainer show={successModal} width={"max-w-sm p-8"}>
        <div>
          <img
            src={require("../assets/success-icon.png")}
            alt=""
            className="mx-auto"
          />
          <p className="text-center mt-8">
            Your password has been reset successfully!
          </p>
          <div className="flex justify-center py-4">
            <Button
              handleButton={toggleSucces}
              text={"Continue"}
              style={"w-full"}
            />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default ResetPassword;
