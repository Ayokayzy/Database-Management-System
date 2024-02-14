import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setVerifyMsg, verifyUser } from "../../data/Reducers/databaseSlice";

const VerifyToken = () => {
  const [isLoading, setIsLoading] = useState(false)
  console.log('Verify page');
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handleVerifyUser = async () => {
      setIsLoading(true)
      try {
        const res = await axios.post("database/user/acceptInvite", {
          token: id,
        });
        console.log(res);
        dispatch(setVerifyMsg(res.data.message));
        dispatch(verifyUser(true));
        setIsLoading(false)
      } catch (err) {
        console.log(err);
        dispatch(setVerifyMsg(err.response?.data?.message));
        dispatch(verifyUser(false));
        setIsLoading(false)
        // return toast.error(err.response?.data?.message);
      }
      navigate("/invite");
    };
    handleVerifyUser();
  }, []);
  return <div>VerifyToken</div>;
};

export default VerifyToken;
