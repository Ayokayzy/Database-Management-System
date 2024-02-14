import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setVerifyMsg, verifyUser } from "../../data/Reducers/databaseSlice";

const VerifyToken = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  console.log(id);
  useEffect(() => {
    const handleVerifyUser = async () => {
      try {
        const res = await axios.post("database/user/acceptInvite", {
          token: id,
        });
        dispatch(setVerifyMsg(res.data.message));
        dispatch(verifyUser(true));
      } catch (err) {
        console.log(err);
        dispatch(setVerifyMsg(err.response?.data?.message));
        dispatch(verifyUser(true));
        // return toast.error(err.response?.data?.message);
      }
      navigate("/invite")
    };
    handleVerifyUser();
  }, []);
  return <div>VerifyToken</div>;
};

export default VerifyToken;
