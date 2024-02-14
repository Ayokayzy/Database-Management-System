import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import DatabaseCard from "../../../../components/database-card/database-card";

import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollectionDetails } from "../../../../data/Reducers/collectionSlice";
import {
  selectCollectionDetails,
  selectCurrentCollection,
} from "../../../../data/selectors/collectionSelector";
import { selectCurrentDatabAse } from "../../../../data/selectors/databaseSelector";
import ModalContainer from "../../../../components/modal-container/modal-container";
import Input from "../../../../components/input/input";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import { EditInput } from "..";

const Document = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const collectionId = useSelector(selectCurrentCollection);
  const databaseId = useSelector(selectCurrentDatabAse);
  const collectionSchema = useSelector(selectCollectionDetails);
  console.log(collectionSchema);

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
      // setCollectionData(defaultCollection);
      setField("");
    };

  const closeCreateModal = () => {
    closeField();
    setCreateModal(false);
  };

  useEffect(() => {
    dispatch(fetchCollectionDetails(collectionId, databaseId));
  }, []);
  return (
    <div className="m-4 min-h-screen bg-white p-8">
      <div className="flex justify-between">
        <h3 className="font-medium text-xl uppercase">All Document</h3>
        <div className="flex">
          <button
            type="submit"
            className="h-10 bg-[#1E13FE] rounded-xl text-white barlow text-base font-normal flex items-center gap-4 px-8"
            color={"#ffffff"}
            onClick={() => toggleCreateModal("create")}
          >
            <span>
              <IoIosAdd />
            </span>
            Add data
          </button>
        </div>
      </div>
      <div className="grid mt-8 lg:grid-cols-3 gap-8 md:grid-cols-2">
        <DatabaseCard>
          <div className="p-6">
            <div className="my-2 space-y-1">
              <p className="text-lg">
                First Name: <b>Arawole</b>
              </p>
              <p className="text-lg">
                Age: <b>23</b>
              </p>
              <p className="text-lg">
                Education: <b>Lautech</b>
              </p>
              <p className="text-lg">
                Picture:{" "}
                <span>
                  <button className="border-2 rounded p-2 font-medium text-sm">
                    View
                  </button>{" "}
                  <button className="border-2 rounded p-2 font-medium text-sm">
                    Download
                  </button>{" "}
                </span>
              </p>
              <p className="text-lg">
                <span>
                  CV:{" "}
                  <button className="border-2 rounded p-2 font-medium text-sm">
                    Download
                  </button>
                </span>
              </p>
            </div>
            <div className="flex justify-end">
              <div className="flex items-center gap-2">
                <button className="p-2 font-light bg-gray-200 text-gray-400 rounded-md">
                  <MdOutlineEdit />
                </button>
                <button className="p-2 font-light bg-gray-200 text-gray-400 rounded-md">
                  <RiDeleteBin5Line />
                </button>
              </div>
            </div>
          </div>
        </DatabaseCard>
      </div>
      <ModalContainer show={createModal} close={closeCreateModal}>
        <div>
          <div className="text-center">
            <h3 className="text-2xl font-medium text-[#1400FF] uppercase">
              {mode === "create" ? "Create Document" : "Edit Dociment"}
            </h3>
          </div>
          <div>
            <EditInput
              type={"text"}
              label={"Collection name"}
              onChange={(e) => {}}
            />
            {mode === "edit" && (
              <div className="my-8 text-center">
                <h3 className="text-2xl font-medium text-[#1400FF] uppercase">
                  Edit Fields
                </h3>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-normal">{field.name}</p>
                    <button
                      className="p-2 font-light bg-gray-200 text-gray-400 rounded-md"
                      onClick={() => {}}
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
                  onClick={() => {}}
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
              {mode == "edit" && (
                <button
                  type="submit"
                  className="h-10 w-24 bg-main rounded-xl text-white barlow font-normal text-lg"
                  disabled={isLoading}
                  color={"#ffffff"}
                  onClick={() => {}}
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
              )}
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
                <EditInput
                  label={"Field Name"}
                  type={"text"}
                  // value={fieldsData.name}
                  // onChange={handleField}
                  // name={"name"}
                />
                <EditInput
                  label={"Data Type"}
                  type={"select"}
                  options={[
                    "Numeric value",
                    "Text",
                    "Image",
                    "Video",
                    "Document",
                    "Link to another file",
                  ]}
                  // onChange={handleField}
                  // value={fieldsData.dataType}
                  // name={"dataType"}
                />
                <EditInput
                  label={"Required"}
                  type={"select"}
                  options={["True", "False"]}
                  // onChange={handleField}
                  // value={fieldsData.required}
                  // name={"required"}
                />
                <EditInput
                  label={"Unique"}
                  type={"select"}
                  // options={
                  //   cannotBeUnique(fieldsData.dataType)
                  //     ? ["False"]
                  //     : ["True", "False"]
                  // }
                  // onChange={handleField}
                  // name={"unique"}
                  // value={fieldsData.unique}
                />
              </div>
            ) : (
              <div className="m max-h-96 overflow-y-auto scrollbar-hide">
                <p className="text-xl">
                  <b>Name: Students</b>
                </p>
                <p className="text-lg font-medium">Fields</p>
                <div className="p-4 rounded-md space-y-4 shadow-lg m-4">
                  <p>Name: name</p>
                  <p>Data Type: data type</p>
                  <p>Required: required</p>
                  <p>Unique: unique</p>
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
                    setField("");
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
                  // console.log(field);
                  // if (field === "add") {
                  //   if (
                  //     !fieldsData.name ||
                  //     !fieldsData.dataType ||
                  //     fieldsData.required === "" ||
                  //     fieldsData.unique === ""
                  //   )
                  //     return toast.error("Select all fields");
                  //   if (mode === "create") {
                  //     collectionData.fields.push(fieldsData);
                  //     setField("add more");
                  //   } else {
                  //     let newArr = collectionData.fields.filter(
                  //       (item) => item._id !== fieldsData._id
                  //     );
                  //     newArr.push(fieldsData);
                  //     collectionData.fields = [...newArr];
                  //     setField("");
                  //   }
                  //   setFieldsData(defaultField);
                  // } else {
                  //   createCollection();
                  // }
                }}
              >
                {isLoading ? (
                  <span className="text-white flex items-center justify-center">
                    <ClipLoader size={20} color="#fff" />
                  </span>
                ) : field === "add" ? (
                  mode == "create" ? (
                    "Add"
                  ) : (
                    "Edit"
                  )
                ) : (
                  "Create collection"
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
            src={require("../../../../assets/delete-svg.gif")}
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
            src={require("../../../../assets/success-icon.png")}
            alt=""
            className="mx-auto"
          />
          <p className="text-center mt-8">Action is successful!</p>
        </div>
      </ModalContainer>
    </div>
  );
};

export default Document;
