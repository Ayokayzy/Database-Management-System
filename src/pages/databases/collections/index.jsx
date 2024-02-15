import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import DatabaseCard from "../../../components/database-card/database-card";

import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ModalContainer from "../../../components/modal-container/modal-container";
import Input from "../../../components/input/input";
import { ClipLoader } from "react-spinners";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentDatabAse } from "../../../data/selectors/databaseSelector";
import { toast } from "react-toastify";
import axios from "axios";
import {
  fetchAllCollections,
  fetchCollectionDetails,
  setCurrentColletion,
} from "../../../data/Reducers/collectionSlice";
import {
  selectCollection,
  selectCollectionDetails,
} from "../../../data/selectors/collectionSelector";

const defaultField = {
  name: "",
  required: "",
  unique: "",
  dataType: "",
};

export const cannotBeUnique = (dataType) => {
  return ["image", "video", "document", "link to another file"].includes(
    dataType
  );
};

const Collections = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("create");
  const [field, setField] = useState("");
  const currentDatabase = useSelector(selectCurrentDatabAse);
  const collection = useSelector(selectCollection);
  const collectionDetails = useSelector(selectCollectionDetails);
  console.log(currentDatabase);
  const [fieldsData, setFieldsData] = useState(defaultField);
  const defaultCollection = {
    database: currentDatabase,
    name: "",
    fields: [],
  };
  const [collectionData, setCollectionData] = useState(defaultCollection);

  const handleField = (e) => {
    const { name, value } = e.target;
    setFieldsData({ ...fieldsData, [name]: value });
  };

  const cannotBeUnique = (dataType) => {
    return ["image", "video", "document", "link to another file"].includes(
      dataType
    );
  };

  const dispatch = useDispatch();

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
      setCollectionData(defaultCollection);
      setField("");
    };

  const closeCreateModal = () => {
    closeField();
    setCreateModal(false);
  };

  const createCollection = async () => {
    setIsLoading(true);
    console.log(collectionData);
    try {
      const res = await axios.post("/collection", collectionData);
      console.log(res);
      dispatch(fetchAllCollections(currentDatabase));
      setIsLoading(false);
      closeField();
      toast.success(res.data.message);
      toggleSuccessModal();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return toast.error(err.response?.data?.message);
    }
  };

  const editCollection = async () => {
    setIsLoading(true);
    console.log(collectionData);
    let data = {
      ...collectionData,
      fields: collectionData.fields.map((item) => ({
        ...item,
        unique: String(item.unique),
        required: String(item.required),
      })),
    };
    console.log(data);
    try {
      const res = await axios.put("/collection", data);
      console.log(res);
      dispatch(fetchAllCollections(currentDatabase));
      setIsLoading(false);
      closeField();
      toast.success(res.data.message);
      toggleSuccessModal();
      toggleCreateModal();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    dispatch(fetchAllCollections(currentDatabase));
  }, []);
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
        {collection?.map((data) => (
          <DatabaseCard
            handleClick={() => {
              dispatch(setCurrentColletion(data._id))
              navigate("/databases/collections/documents");
            }}
          >
            <div className="p-8">
              <div className="flex items-center gap-8 ml-4 mb-12">
                <img src={require(`../../../assets/${"db.png"}`)} alt="" />
                <p className="font-medium text-lg capitalize">{data.name}</p>
              </div>
              {/* <div className="my-4 space-y-2">
                <p className="font-semibold text-lg">Documents: 5</p>
              </div> */}
              <div className="flex justify-end w-fit ml-auto relative z-30">
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 font-light bg-gray-200 text-gray-400 rounded-md"
                    onClick={() => {
                      setCollectionData({
                        name: data?.name,
                        fields: data?.fields,
                        database: data?.database,
                        _id: data._id,
                      });
                      console.log({ collectionData });
                      toggleCreateModal("edit");
                    }}
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
        ))}
      </div>
      <ModalContainer show={createModal} close={closeCreateModal}>
        <div>
          <div className="text-center">
            <h3 className="text-2xl font-medium text-[#1400FF] uppercase">
              {mode === "create" ? "Create Collection" : "Edit Collection Name"}
            </h3>
          </div>
          <div>
            <Input
              type={"text"}
              label={"Collection name"}
              onChange={(e) =>
                setCollectionData({ ...collectionData, name: e.target.value })
              }
              value={collectionData.name}
            />
            {mode === "edit" && (
              <div className="my-8 text-center">
                <h3 className="text-2xl font-medium text-[#1400FF] uppercase">
                  Edit Fields
                </h3>
                <div className="space-y-2 mt-4">
                  {collectionData?.fields?.map((field) => (
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-normal">{field.name}</p>
                      <button
                        className="p-2 font-light bg-gray-200 text-gray-400 rounded-md"
                        onClick={() => {
                          let { name, unique, required, dataType } = field;
                          setFieldsData(field);
                          setField("add");
                          setMode("edit");
                        }}
                      >
                        <MdOutlineEdit />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {mode === "create" && (
              <div className="flex justify-end items-center gap-2 mt-2">
                <button
                  className="p-2 rounded-md bg-gray-200"
                  onClick={() => {
                    if (collectionData.name) {
                      toggleCreateModal();
                      setField("add");
                    } else {
                      toast.error("Add a collection name");
                    }
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
              {mode == "edit" && (
                <button
                  type="submit"
                  className="h-10 w-24 bg-main rounded-xl text-white barlow font-normal text-lg"
                  disabled={isLoading}
                  color={"#ffffff"}
                  onClick={editCollection}
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
                  value={fieldsData.name}
                  onChange={handleField}
                  name={"name"}
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
                  onChange={handleField}
                  value={fieldsData.dataType}
                  name={"dataType"}
                />
                <EditInput
                  label={"Required"}
                  type={"select"}
                  options={["True", "False"]}
                  onChange={handleField}
                  value={fieldsData.required}
                  name={"required"}
                />
                <EditInput
                  label={"Unique"}
                  type={"select"}
                  options={
                    cannotBeUnique(fieldsData.dataType)
                      ? ["False"]
                      : ["True", "False"]
                  }
                  onChange={handleField}
                  name={"unique"}
                  value={fieldsData.unique}
                />
              </div>
            ) : (
              <div className="m max-h-96 overflow-y-auto scrollbar-hide">
                <p className="text-xl">
                  <b>Name: {collectionData.name}</b>
                </p>
                <p className="text-lg font-medium">Fields</p>
                {collectionData?.fields?.map((data) => (
                  <div className="p-4 rounded-md space-y-4 shadow-lg m-4">
                    <p>Name: {data.name}</p>
                    <p>Data Type: {data.dataType}</p>
                    <p>Required: {data.required}</p>
                    <p>Unique: {data?.unique}</p>
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
                ))}
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
                  console.log(field);
                  console.log(fieldsData);
                  console.log(collectionData.fields);
                  if (field === "add") {
                    if (
                      !fieldsData.name ||
                      !fieldsData.dataType ||
                      fieldsData.required === "" ||
                      fieldsData.unique === ""
                    )
                      return toast.error("Select all fields");
                    if (mode === "create") {
                      collectionData.fields.push(fieldsData);
                      setField("add more");
                    } else {
                      let newArr = collectionData.fields.filter(
                        (item) => item._id !== fieldsData._id
                      );
                      newArr.push(fieldsData);
                      collectionData.fields = [...newArr];
                      setField("");
                    }
                    setFieldsData(defaultField);
                  } else {
                    createCollection();
                  }
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

export const EditInput = ({
  type,
  label,
  options = [],
  style,
  ...restProps
}) => {
  return (
    <div>
      {type === "select" ? (
        <div className={`flex items-center gap-4 ${style}`}>
          <label className="font-semibold whitespace-nowrap">{label}:</label>
          <select
            name=""
            className="h-10 border-2 rounded-md px-4 w-full"
            {...restProps}
          >
            <option value="">--select--</option>
            {options.map((option) => (
              <option value={option.toLowerCase()}>{option}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <label className="font-semibold whitespace-nowrap">{label}:</label>
          <input
            type="text"
            className="h-10 border-2 rounded-md px-4 w-full"
            {...restProps}
          />
        </div>
      )}
    </div>
  );
};
