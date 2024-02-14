import React from "react";
import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectVerifyMsg,
  selectVerifyUser,
} from "../../data/selectors/databaseSelector";

const InviteSuccess = () => {
  const navigate = useNavigate();
  const msg = useSelector(selectVerifyMsg);
  const user = useSelector(selectVerifyUser);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="space-y-8">
        {user ? (
          <img
            src={require("../../assets/success-icon.png")}
            className="mx-auto"
            alt=""
          />
        ) : (
          <h1 className="text-6xl font-black text-center text-red-600">404</h1>
        )}
        <h2 className="text-4xl font-semibold font-hoho text-center">
          {msg || "Success"}
        </h2>
        {user && (
          <div className="flex justify-center">
            <Button text={"Login"} handleButton={() => navigate("/login")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InviteSuccess;
