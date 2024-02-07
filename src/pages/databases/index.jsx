import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import DatabaseCard from "../../components/database-card/database-card";

import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ModalContainer from "../../components/modal-container/modal-container";
import Input from "../../components/input/input";
import { ClipLoader } from "react-spinners";

const Databases = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("create");
  const [inviteModal, setInviteModal] = useState(false),
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

  return (
    <div className="m-4 min-h-screen bg-white p-8">
      <div className="flex justify-between">
        <h3 className="font-medium text-xl uppercase">All Databases</h3>
        <button
          type="submit"
          className="h-10 bg-[#1E13FE] rounded-xl text-white barlow text-base font-normal flex items-center gap-4 px-8"
          color={"#ffffff"}
          onClick={() => toggleCreateModal("create")}
        >
          <span>
            <IoIosAdd />
          </span>
          create database
        </button>
      </div>
      <div className="grid mt-8 lg:grid-cols-3 gap-8 md:grid-cols-2">
        <DatabaseCard handleClick={() => navigate("/databases/collections")}>
          <div className="p-8">
            <div className="flex items-center gap-8 ml-4">
              <img src={require(`../../assets/${"db.png"}`)} alt="" />
              <p className="font-medium text-lg">Database Name</p>
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
                    onClick={() => toggleCreateModal("edit")}
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    className="p-2 font-light bg-gray-200 text-gray-400 rounded-md"
                    onClick={toggleDeleteModal}
                  >
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DatabaseCard>
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
            <Input type={"text"} label={"Email address"} />
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
                  toggleInviteModal();
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
            <Input type={"text"} label={"Database name"} />
            <div className="flex justify-center gap-8 mt-8">
              <button
                type="reset"
                className="h-8 w-24 border-2 border-main rounded-xl text-main barlow text-base font-normal"
                color={"#ffffff"}
                onClick={toggleCreateModal}
              >
                Cancel
              </button>
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
