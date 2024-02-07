import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import DatabaseCard from "../../../components/database-card/database-card";

import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ModalContainer from "../../../components/modal-container/modal-container";
import Input from "../../../components/input/input";
import { ClipLoader } from "react-spinners";
import { IoMdAdd } from "react-icons/io";

const Collections = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("create");
  const [field, setField] = useState("");

  const [deleteModal, setDeleteModal] = useState(false),
    [createModal, setCreateModal] = useState(false),
    [isLoading, setIsLoading] = useState(false),
    [successModal, setSuccessModal] = useState(false),
    toggleCreateModal = (mode) => {
      if (mode) setMode(mode);
      setCreateModal(!createModal);
    },
    toggleDeleteModal = () => {
      setDeleteModal(!deleteModal);
    },
    toggleSuccessModal = () => {
      setSuccessModal(!successModal);
    },
    closeField = () => {
      setField("");
    };
  return (
    <div className="m-4 min-h-screen bg-white p-8">
      <div className="flex justify-between">
        <h3 className="font-medium text-xl uppercase">All Collections</h3>
        <button
          type="submit"
          className="h-10 bg-[#1E13FE] rounded-xl text-white barlow text-base font-normal flex items-center gap-4 px-8"
          color={"#ffffff"}
          onClick={() => toggleCreateModal("create")}
        >
          <span>
            <IoIosAdd />
          </span>
          create collection
        </button>
      </div>
      <div className="grid mt-8 lg:grid-cols-3 gap-8 md:grid-cols-2">
        <DatabaseCard handleClick={() => navigate("/databases/collections/id")}>
          <div className="p-8">
            <div className="flex items-center gap-8 ml-4">
              <img src={require(`../../../assets/${"db.png"}`)} alt="" />
              <p className="font-medium text-lg">Database Name</p>
            </div>
            <div className="my-4 space-y-2">
              <p className="font-semibold text-lg">Documents: 5</p>
            </div>
            <div className="flex justify-end w-fit ml-auto relative z-30">
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
        </DatabaseCard>
      </div>
      <ModalContainer show={createModal} close={toggleCreateModal}>
        <div>
          <div className="text-center">
            <h3 className="text-2xl font-medium text-[#1400FF] uppercase">
              {mode === "create" ? "Create Collection" : "Edit Collection Name"}
            </h3>
          </div>
          <div>
            <Input type={"text"} label={"Collection name"} />
            {mode === "edit" && (
              <div className="my-8 text-center">
                <h3 className="text-2xl font-medium text-[#1400FF] uppercase">
                  Edit Fields
                </h3>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-normal">Field Name</p>
                    <button
                      className="p-2 font-light bg-gray-200 text-gray-400 rounded-md"
                      onClick={() => setField("add")}
                    >
                      <MdOutlineEdit />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-normal">Field Name</p>
                    <button
                      className="p-2 font-light bg-gray-200 text-gray-400 rounded-md"
                      onClick={() => setField("add")}
                    >
                      <MdOutlineEdit />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {mode === "create" && (
              <div className="flex justify-end items-center gap-2 mt-2">
                <button
                  className="p-2 rounded-md bg-gray-200"
                  onClick={() => {
                    toggleCreateModal();
                    setField("add");
                  }}
                >
                  <IoMdAdd />
                </button>
                <p>Add field</p>
              </div>
            )}
            <div className="flex justify-center gap-8 mt-8">
              <button
                type="reset"
                className="h-10 w-24 border-2 border-main rounded-xl text-main barlow text-base font-normal"
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
      <ModalContainer show={field} close={closeField}>
        <div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold uppercase">
              {field === "add"
                ? mode === "create"
                  ? "Add Field"
                  : "Edit field"
                : "Add More"}
            </h3>
          </div>
          <div>
            {field === "add" ? (
              <div className="space-y-4 mt-8">
                <EditInput label={"Field Name"} type={"text"} />
                <EditInput label={"Data Type"} type={"select"} />
                <EditInput label={"Required"} type={"select"} />
                <EditInput label={"Unique"} type={"select"} />
              </div>
            ) : (
              <div className="m max-h-96 overflow-y-auto scrollbar-hide">
                <p className="text-xl">
                  <b>Name: Students</b>
                </p>
                <p className="text-lg font-medium">Fields</p>
                <div className="p-4 rounded-md space-y-4 shadow-lg m-4">
                  <p>Name: Student</p>
                  <p>Username: True</p>
                  <p>Name: Student</p>
                  <p>Name: Student</p>
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 font-light bg-gray-200 text-gray-400 rounded-md">
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
                <div className="p-4 rounded-md space-y-4 shadow-lg m-4">
                  <p>Name: Student</p>
                  <p>Username: True</p>
                  <p>Name: Student</p>
                  <p>Name: Student</p>
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 font-light bg-gray-200 text-gray-400 rounded-md">
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
            )}
            {field === "add more" && mode !== "edit" && (
              <div className="flex justify-end items-center gap-2 mt-2">
                <button
                  className="p-2 rounded-md bg-gray-200"
                  onClick={() => setField("add")}
                >
                  <IoMdAdd />
                </button>
              </div>
            )}
            <div className="flex justify-center gap-8 mt-8">
              {mode === "edit" && (
                <button
                  type="reset"
                  className="h-10 w-24 border-2 border-main rounded-xl text-main barlow text-base font-normal"
                  color={"#ffffff"}
                  onClick={() => {
                    closeField();
                  }}
                >
                  Candel
                </button>
              )}
              <button
                type="submit"
                className="bg-main rounded-xl text-white barlow font-normal text-lg px-8 py-2"
                disabled={isLoading}
                color={"#ffffff"}
                onClick={() => {
                  console.log(field);
                  if (field === "add") {
                    console.log("in here");
                    setField("add more");
                  } else {
                    closeField();
                    toggleSuccessModal();
                  }
                }}
              >
                {isLoading ? (
                  <span className="text-white flex items-center justify-center">
                    Update <ClipLoader size={20} color="#fff" />
                  </span>
                ) : field === "add" ? (
                  mode == "add" ? (
                    "Add"
                  ) : (
                    "Edit"
                  )
                ) : (
                  "Create"
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
            src={require("../../../assets/delete-svg.gif")}
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
              onClick={() => {
                toggleDeleteModal();
                toggleSuccessModal();
              }}
            >
              Yes
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
            src={require("../../../assets/success-icon.png")}
            alt=""
            className="mx-auto"
          />
          <p className="text-center mt-8">Action is successful!</p>
        </div>
      </ModalContainer>
    </div>
  );
};

export default Collections;

const EditInput = ({ type, label, options = [] }) => {
  return (
    <div>
      {type === "select" ? (
        <div className="flex items-center gap-4">
          <label className="font-semibold whitespace-nowrap">{label}:</label>
          <select name="" className="h-10 border-2 rounded-md px-4 w-full">
            <option value="">--select--</option>
            {options.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <label className="font-semibold whitespace-nowrap">{label}:</label>
          <input type="text" className="h-10 border-2 rounded-md px-4 w-full" />
        </div>
      )}
    </div>
  );
};
