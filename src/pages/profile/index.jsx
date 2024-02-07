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

const Profile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  console.log("auth", auth.user);

  const formData = new FormData();

  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    firstName: auth?.user?.firstName,
    lastName: auth?.user?.lastName,
    gender: auth?.user?.gender,
    dob: auth?.user?.dob,
    phone: auth?.user?.phone,
    password: "",
    bio: auth?.user?.bio,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    Object.keys(formValue).forEach((value) => {
      formData.append(value, formValue[value]);
    });
    // formData.append("image", image);
  };

  return (
    <div className="p-4">
      <div className="bg-white p-8 rounded-md">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex w-full justify-center">
            <UpdateProfilePicture />
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <Input
              label="Last name"
              type="text"
              placeholder="Mercy"
              onChange={handleInput}
              name="lastName"
              value={formValue.lastName}
              inputType="text"
            />
            <Input
              label="First Name"
              type="text"
              placeholder="Williams"
              onChange={handleInput}
              name="firstName"
              value={formValue.firstName}
              inputType="text"
            />
            <div className="col-span-2">
              <Input
                label="Email"
                type="email"
                placeholder="emailaddress@gmail.com"
                onChange={handleInput}
                name="email"
                value={formValue.bio}
                inputType="text"
              />
            </div>
            <div className="col-span-2">
              <Input
                label="Phone Number"
                type="text"
                placeholder="+234 900 111 2222"
                onChange={handleInput}
                name="pnone"
                value={formValue.phone}
                inputType="text"
              />
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-8">
            <button
              type="reset"
              className="h-8 w-24 border-2 border-main rounded-xl text-main barlow text-base font-normal"
              disabled={isLoading}
              color={"#ffffff"}
            >
              {isLoading ? (
                <span className="text-white flex items-center justify-center">
                  Update <ClipLoader size={20} color="#fff" />
                </span>
              ) : (
                "Cancel"
              )}
            </button>
            <button
              type="submit"
              className="h-8 w-24 bg-main rounded-xl text-white barlow text-base font-normal"
              disabled={isLoading}
              color={"#ffffff"}
            >
              {isLoading ? (
                <span className="text-white flex items-center justify-center">
                  Update <ClipLoader size={20} color="#fff" />
                </span>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
        {/* <PasswordBox /> */}
      </div>
    </div>
  );
};

export default Profile;

export const PasswordBox = () => {
  let { auth } = useSelector((state) => state);
  let init = {
      oldPassword: "",
      newPassword: "",
    },
    [state, setState] = useState(init),
    [loading, setLoading] = useState(false),
    [submit, setSubmit] = useState(false),
    dispatch = useDispatch(),
    textChange =
      (name) =>
      ({ target: { value } }) => {
        setState({ ...state, [name]: value });
      },
    handleSubmit = async (e) => {
      e?.preventDefault();
      console.log({ state });
      if (!state?.oldPassword || !state?.newPassword) return;
    };

  useEffect(() => {
    if (submit && auth?.isPassword) {
      setState(init);
      setSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit, auth?.isPassword]);

  return (
    <div className="py-4 py-md-5">
      <h6 className="Lexend fw-600 fontReduceBig text-uppercase mt-3 mt-md-5 text-base text-main font-semibold barlow capitalize">
        Change password
      </h6>
      <small className="text-base  barlow capitalize">
        Please enter your current password to change your password.
      </small>
      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <div className="space-y-4">
          <p className="text-base text-main font-semibold barlow capitalize">
            Old password
          </p>
          <input
            type="password"
            placeholder="..........."
            name="password"
            value={state?.oldPassword}
            onChange={textChange("oldPassword")}
            className="h-12 pl-6 text-base mt-2 text-[#101840] font-normal barlow w-full rounded-xl"
          />
        </div>
        <div className="space-y-4">
          <p className="text-base text-main font-semibold barlow capitalize">
            New password
          </p>
          <input
            type="password"
            value={state?.newPassword}
            onChange={textChange("newPassword")}
            placeholder="..........."
            name="password"
            className="h-12 pl-6 text-base mt-2 text-[#101840] font-normal barlow w-full rounded-xl"
          />
        </div>
      </div>
      <div className="flex items-center my-3">
        <button
          onClick={handleSubmit}
          type="button"
          className={`h-8 w-24 bg-main rounded-xl text-white barlow text-base font-normal`}
        >
          {loading ? (
            <span className="text-white flex items-center justify-center">
              Update <ClipLoader size={20} color="#fff" />
            </span>
          ) : (
            "Update"
          )}
        </button>
        <button
          onClick={() => setState(init)}
          type="button"
          className={`btn btn-outline-primary1 text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-primary1`}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export const UpdateProfilePicture = () => {
  let { auth } = useSelector((state) => state),
    [logo, setLogo] = useState(false),
    [state, setState] = useState(auth?.user),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch(),
    handleNext = async (e) => {
      e?.preventDefault();
      if (!logo) return;
      setLoading(true);
    };
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (auth?.user) setState(auth?.user);
  }, [auth?.user]);

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
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-4 mt-8">
        <img
          src={
            logo ? URL.createObjectURL(logo) : auth?.user?.avatar?.url || require("../../assets/pp-2.png")
          }
          alt=""
          className="h-36 w-36 rounded-full border"
        />
        <div className="flex gap-6">
          {logo && (
            <button
              type="button"
              onClick={() => setLogo(null)}
              className="h-8 w-24 bg-main rounded-xl text-white barlow text-base font-normal"
            >
              Remove
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
              className="h-8 w-24 bg-main rounded-xl text-white barlow text-base font-normal"
              onClick={() => fileInputRef.current.click()}
            >
              Upload
            </button>
          </div>
        </div>
      </div>

      {logo && (
        <div className="py-3 flex justify-center">
          <button
            onClick={handleNext}
            type="button"
            className={`h-8 w-24 bg-main rounded-xl text-white barlow text-base font-normal`}
          >
            {loading && logo ? (
              <span className="text-white flex items-center justify-center">
                Update <ClipLoader size={20} color="#fff" />
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
