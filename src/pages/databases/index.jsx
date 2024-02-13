import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import DatabaseCard from "../../components/database-card/database-card";

import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ModalContainer from "../../components/modal-container/modal-container";
import Input from "../../components/input/input";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllDatabase, setCurrentDatabase, setDatabase } from "../../data/Reducers/databaseSlice";
import { selectDatabaseItems } from "../../data/selectors/databaseSelector";

const Databases = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("create");
  const [inviteModal, setInviteModal] = useState(false),
    [itemId, setItemId] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    [deleteModal, setDeleteModal] = useState(false),
    [successModal, setSuccessModal] = useState(false),
    [createModal, setCreateModal] = useState(false),
    toggleInviteModal = () => {
      setInviteModal(!inviteModal);
    },
    toggleCreateModal = (mode) => {
      setMode(mode);
      setCreateModal(!createModal);
    },
    toggleDeleteModal = () => {
      setDeleteModal(!deleteModal);
    },
    toggleSuccessModal = () => {
      setSuccessModal(!successModal);
    };
  const dispatch = useDispatch();
  const [dbName, setDbName] = useState("");
  const database = useSelector(selectDatabaseItems);
  console.log({ database });

  const createDatabase = async () => {
    console.log(dbName);
    if (!dbName) {
      return toast.error("Enter a database name");
    }
    setIsLoading(true);
    try {
      let res;
      if (mode === "create") {
        res = await axios.post("/database", { name: dbName });
      } else {
        res = await axios.patch("/database", {
          _id: itemId,
          name: dbName,
        });
      }
      console.log(res);
      dispatch(getAllDatabase());
      setIsLoading(false);
      toggleCreateModal();
      toggleSuccessModal();
      setDbName("");
      toast.success(res.data?.message);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return toast.error(err.response?.data?.message);
    }
    // toggleCreateModal();
  };

  const deleteDatabase = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/database/${itemId}`);
      dispatch(getAllDatabase());
      setIsLoading(false);
      toggleDeleteModal();
      // toggleSuccessModal();
      toast.success(res.data?.message);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="m-4 min-h-screen bg-white p-8">
      <div className="flex justify-between">
        <h3 className="font-medium text-xl uppercase">All Databases</h3>
        <button
          type="submit"
          className="h-10 bg-[#1E13FE] rounded-xl text-white barlow text-base font-normal flex items-center gap-4 px-8"
          color={"#ffffff"}
          onClick={() => {
            setDbName("");
            toggleCreateModal("create");
          }}
        >
          <span>
            <IoIosAdd />
          </span>
          create database
        </button>
      </div>
      <div className="grid mt-8 lg:grid-cols-3 gap-8 md:grid-cols-2">
        {database?.map((item) => (
          <DatabaseCard
            handleClick={() => {
              dispatch(setCurrentDatabase(item._id))
              navigate("/databases/collections");
            }}
          >
            <div className="p-8">
              <div className="flex items-center gap-8 ml-4">
                <img src={require(`../../assets/${"db.png"}`)} alt="" />
                <p className="font-medium text-lg">{item.name}</p>
              </div>
              <div className="my-4 space-y-2">
                <p className="font-semibold text-lg">Collections: 10</p>
                <p className="font-semibold text-lg">Documents: 5</p>
              </div>
              <div className="relative h-8 z-50">
                <div className="flex justify-between items-center">
                  <button
                    className="border rounded p-2 font-light"
                    onClick={toggleInviteModal}
                  >
                    Invite users
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 font-light bg-gray-200 text-gray-400 rounded-md"
                      onClick={() => {
                        setItemId(item._id);
                        setDbName(item.name);
                        toggleCreateModal("edit");
                      }}
                    >
                      <MdOutlineEdit />
                    </button>
                    <button
                      className="p-2 font-light bg-gray-200 text-gray-400 rounded-md"
                      onClick={() => {
                        setItemId(item._id);
                        toggleDeleteModal();
                      }}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DatabaseCard>
        ))}
      </div>

      {/* modals */}
      <ModalContainer show={inviteModal} close={toggleInviteModal}>
        <div>
          <div className="text-center">
            <h3 className="text-2xl font-medium text-[#1400FF] uppercase">
              invite users
            </h3>
            <p className="font-medium text-sm max-w-xs mx-auto">
              Enter email address below to invite users, you can multiple email
              addresses
            </p>
          </div>
          <div>
            <Input
              type={"text"}
              label={"Email address"}
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
            />
            <div className="flex justify-center gap-8 mt-8">
              {/* <button
                type="reset"
                className="h-8 w-24 border-2 border-main rounded-xl text-main barlow text-base font-normal"
                color={"#ffffff"}
                onClick={toggleInviteModal}
              >
                Cancel
              </button> */}
              <button
                type="submit"
                className="h-10 w-24 bg-main rounded-xl text-white barlow font-normal text-lg"
                disabled={isLoading}
                color={"#ffffff"}
                onClick={() => {
                  toggleCreateModal();
                  toggleSuccessModal();
                }}
              >
                {isLoading ? (
                  <span className="text-white flex items-center justify-center">
                    Update <ClipLoader size={20} color="#fff" />
                  </span>
                ) : (
                  "Invite"
                )}
              </button>
            </div>
          </div>
        </div>
      </ModalContainer>
      <ModalContainer show={createModal} close={toggleCreateModal}>
        <div>
          <div className="text-center">
            <h3 className="text-2xl font-medium text-[#1400FF] uppercase">
              {mode === "create" ? "Create" : "Edit"} Database
            </h3>
          </div>
          <div>
            <Input
              type={"text"}
              label={"Database name"}
              onChange={(e) => setDbName(e.target.value)}
              value={dbName}
            />
            <div className="flex justify-center gap-8 mt-8">
              <button
                type="reset"
                className="h-10 w-24 border-2 border-main rounded-xl text-main barlow text-base font-normal"
                color={"#ffffff"}
                disabled={isLoading}
                onClick={toggleCreateModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-10 w-24 bg-main rounded-xl text-white barlow font-normal text-lg"
                disabled={isLoading}
                color={"#ffffff"}
                onClick={createDatabase}
              >
                {isLoading ? (
                  <span className="text-white flex items-center justify-center">
                    <ClipLoader size={20} color="#fff" />
                  </span>
                ) : mode === "create" ? (
                  "Create"
                ) : (
                  "Edit"
                )}
              </button>
            </div>
          </div>
        </div>
      </ModalContainer>
      <ModalContainer
        show={deleteModal}
        close={toggleDeleteModal}
        width={"max-w-sm p-8"}
      >
        <div>
          <img
            src={require("../../assets/delete-svg.gif")}
            alt=""
            className="mx-auto"
          />
          <p className="text-center">
            Are you sure you want to delete database? Action cannot be undone.
          </p>
          <div className="flex justify-center gap-8 mt-4">
            <button
              type="submit"
              className="h-10 w-24 bg-main rounded-xl text-white barlow font-normal text-lg"
              disabled={isLoading}
              color={"#ffffff"}
              onClick={() => {
                toggleDeleteModal();
              }}
            >
              No
            </button>
            <button
              type="reset"
              className="h-10 w-24 border-2 border-main rounded-xl text-main barlow text-base font-normal"
              color={"#ffffff"}
              disabled={isLoading}
              onClick={deleteDatabase}
            >
              {isLoading ? (
                <span className="text-white flex items-center justify-center">
                  <ClipLoader size={20} color="#fff" />
                </span>
              ) : (
                "yes"
              )}
            </button>
          </div>
        </div>
      </ModalContainer>
      <ModalContainer
        show={successModal}
        close={toggleSuccessModal}
        width={"max-w-sm p-8"}
      >
        <div>
          <img
            src={require("../../assets/success-icon.png")}
            alt=""
            className="mx-auto"
          />
          <p className="text-center mt-8">Action is successful!</p>
        </div>
      </ModalContainer>
    </div>
  );
};

export default Databases;
