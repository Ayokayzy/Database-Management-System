import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useRef } from "react";
import { returnErrors } from "../../data/Reducers/ErrorReducer";
import moment from "moment";
import Input from "../../components/input/input";
import { selectCurrentUser } from "../../data/selectors/userSelector";
import { loadUser } from "../../data/Reducers/UserReducer";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  // console.log({ user });

  const formData = new FormData();

  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    phone: user?.phone,
    email: user?.email,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.put("user", formValue);
      dispatch(loadUser());
      console.log(res);
      setIsLoading(false);
      toast.success(res.data?.message);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white p-8 rounded-md">
        <div className="flex w-full justify-center">
          <UpdateProfilePicture />
        </div>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <Input
              label="Last name"
              type="text"
              placeholder="Mercy"
              onChange={handleInput}
              name="lastname"
              value={formValue.lastname}
              inputType="text"
            />
            <Input
              label="First Name"
              type="text"
              placeholder="Williams"
              onChange={handleInput}
              name="firstname"
              value={formValue.firstname}
              inputType="text"
            />
            <div className="col-span-2">
              <Input
                label="Email"
                type="email"
                placeholder="emailaddress@gmail.com"
                onChange={handleInput}
                name="email"
                value={formValue.email}
                disabled
                inputType="text"
              />
            </div>
            <div className="col-span-2">
              <Input
                label="Phone Number"
                type="text"
                placeholder="+234 900 111 2222"
                onChange={handleInput}
                name="phone"
                value={formValue.phone}
                inputType="text"
              />
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-8">
            <button
              type="reset"
              className="h-8 w-24 border-2 border-main rounded-xl text-main barlow text-base font-normal"
              color={"#ffffff"}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-8 w-24 bg-main rounded-xl text-white barlow text-base font-normal"
              disabled={isLoading}
              color={"#ffffff"}
            >
              {isLoading ? (
                <span className="text-white flex items-center justify-center">
                  <ClipLoader size={20} color="#fff" />
                </span>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
        <div className="mt-12">
          <PasswordBox />
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const PasswordBox = () => {
  let user = useSelector(selectCurrentUser);
  let init = {
      oldPassword: "",
      password: "",
    },
    [state, setState] = useState(init),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch(),
    textChange =
      (name) =>
      ({ target: { value } }) => {
        setState({ ...state, [name]: value });
      },
    handleSubmit = async (e) => {
      e?.preventDefault();
      console.log({ state });
      if (!state?.oldPassword || !state?.password)
        return toast.error("Enter Password");
      setLoading(true);
      try {
        let res = await axios.post("/auth/change-password", state);
        console.log(res);
        setLoading(false);
        setState(init);
        toast.success(res.data?.message);
      } catch (err) {
        console.log(err);
        setLoading(false);
        return toast.error(err.response?.data?.message);
      }
    };

  return (
    <div className="py-4 py-md-5">
      <h6 className="Lexend fw-600 fontReduceBig text-uppercase mt-3 mt-md-5 text-base text-main font-semibold barlow capitalize">
        Change password
      </h6>
      <small className="text-base  barlow capitalize">
        Please enter your current password to change your password.
      </small>
      <form
        className="grid lg:grid-cols-1 gap-8 mt-8 max-w-lg"
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <p className="text-base text-main font-semibold barlow capitalize">
            Old password
          </p>
          <Input
            type="password"
            placeholder="..........."
            name="password"
            value={state?.oldPassword}
            onChange={textChange("oldPassword")}
          />
        </div>
        <div className="space-y-4">
          <p className="text-base text-main font-semibold barlow capitalize">
            New password
          </p>
          <Input
            type="password"
            value={state?.password}
            onChange={textChange("password")}
            placeholder="..........."
            name="password"
          />
        </div>
        <div className="flex items-center my-8 gap-8">
          <button
            type="reset"
            className="h-8 w-24 border-2 border-main rounded-xl text-main barlow text-base font-normal"
            color={"#ffffff"}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-8 w-24 bg-main rounded-xl text-white barlow text-base font-normal"
            disabled={loading}
            color={"#ffffff"}
          >
            {loading ? (
              <span className="text-white flex items-center justify-center">
                <ClipLoader size={20} color="#fff" />
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export const UpdateProfilePicture = () => {
  let { user } = useSelector((state) => state),
    [logo, setLogo] = useState(false),
    [state, setState] = useState(user?.user),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch(),
    handleNext = async (e) => {
      e?.preventDefault();
      if (!logo) return toast.error("Upload a valid image");
      setLoading(true);
      try {
        let res = await axios.post("/user/upload", { image });
        console.log(res);
        setLoading(false);
        toast.success(res.data?.message);
      } catch (err) {
        console.log(err);
        setLoading(false);
        return toast.error(err.response?.data?.message);
      }
    };
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user?.user) setState(user?.user);
  }, [user?.user]);

  const image = new FormData();
  let handleChangeImage = (e) => {
    const file = e.target.files[0];
    let err = "";

    if (!file) return (err = `File, ${file?.name} does not exist`);
    if (!file.type.includes("image"))
      return (err = `File, ${file?.name} format not supported`);

    if (err) {
      return toast.error(err);
    } else {
      setLogo(file);
      image.append("image", file);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-4 mt-8 relative">
        <img
          src={
            logo
              ? URL.createObjectURL(logo)
              : user?.user?.avatar?.url || require("../../assets/pp-2.png")
          }
          alt=""
          className="h-36 w-36 rounded-full border"
        />
        <div className="flex gap-6">
          {logo && (
            <button
              type="button"
              onClick={() => setLogo(null)}
              // className="h-8 w-24 bg-main rounded-xl text-white barlow text-base font-normal"
              className="absolute p-2 bg-red-400 border-2 border-red-500 text-white rounded-full left-2 bottom-4"
            >
              <RiDeleteBin6Line />
            </button>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              // accept="image/*"
              style={{ display: "none" }}
              onChange={handleChangeImage}
              name="image"
            />
            <button
              type="button"
              // className="h-8 w-24 bg-main rounded-xl text-white barlow text-base font-normal"
              className="absolute p-2 bg-main text-white rounded-full right-2 bottom-4"
              onClick={() => fileInputRef.current.click()}
            >
              <MdEdit />
            </button>
          </div>
        </div>
      </div>

      {logo && (
        <div className="py-3 flex justify-center">
          <button
            onClick={handleNext}
            type="button"
            disabled={loading}
            className={`h-8 w-24 bg-main rounded-xl text-white barlow text-base font-normal`}
          >
            {loading && logo ? (
              <span className="text-white flex items-center justify-center">
                <ClipLoader size={20} color="#fff" />
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      )}
    </div>
  );
};
