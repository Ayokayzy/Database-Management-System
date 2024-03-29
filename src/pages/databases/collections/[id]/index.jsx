import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import DatabaseCard from "../../../../components/database-card/database-card";

import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
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
import { EditInput, cannotBeUnique } from "..";
import { fetchAllDocuments } from "../../../../data/Reducers/documentsSlice";
import {
  selectAllDocuments,
  selectDocumentLoading,
} from "../../../../data/selectors/documentSelector";
import Loader from "../../../../components/loader/loader";
import JsFileDownloader from "js-file-downloader";

const Document = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { dbId, colId } = location.state;
  const documents = useSelector(selectAllDocuments);
  const collectionSchema = useSelector(selectCollectionDetails);
  const documentLoading = useSelector(selectDocumentLoading);
  // console.log({ colId, dbId });
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("create");
  const [fieldsData, setFieldsData] = useState({});
  const [editData, setEditData] = useState({});
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
    };
  const handleField = (e) => {
    const { name, value, files } = e.target;
    if (e.target.type === "file") {
      setFieldsData({ ...fieldsData, [name]: files[0] });
    } else {
      setFieldsData({ ...fieldsData, [name]: value });
    }
  };

  const downloadFile = async (url) => {
    setLoading(true);
    try {
      await new JsFileDownloader({ url });
      setLoading(false);
    } catch (err) {
      toast.error("Download failed");
      setLoading(false);
      console.log(err);
    }
  };

  const closeCreateModal = () => {
    setCreateModal(false);
  };

  const formData = new FormData();

  const createDocument = async (e) => {
    e.preventDefault();
    handleEditData(editData);
    console.log(fieldsData);
    if (!fieldsData) return toast.error("All fields are required");
    let flag = 0;
    Object.keys(fieldsData).forEach((data) => {
      if (!fieldsData[data]) {
        flag++;
      }
    });
    if (flag > 0) {
      return toast.error("All fields are required");
    }
    // Object.keys(fieldsData).forEach((data) =>
    //   formData.append(data, fieldsData[data])
    // );
    const data = {
      collectionId: colId,
      database: dbId,
      ...fieldsData,
    };
    const myEditData = {
      ...fieldsData,
      _id: editData._id,
    };
    Object.keys(data).forEach((dat) => formData.append(dat, data[dat]));
    console.log(data);
    console.log(mode);
    console.log(myEditData);
    setIsLoading(true);
    try {
      let res;
      if (mode === "create") {
        res = await axios.post("/document", formData);
      } else {
        res = await axios.put("/document", myEditData);
      }
      console.log(res);
      dispatch(fetchAllDocuments({ colId, dbId }));
      setIsLoading(false);
      toggleCreateModal();
      // toggleSuccessModal();
      setFieldsData({});
      toast.success(res.data?.message);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return toast.error(err.response?.data?.message);
    }
  };

  // const handleEdit = (doc) => {
  //   let inputDetails = {};
  //   setEditData(doc);
  //   console.log(doc);
  //   doc?.text?.map((field) => {
  //     inputDetails[field.name] = field.value;
  //   });
  //   setFieldsData(inputDetails);
  //   toggleCreateModal("edit");
  // };

  const handleEdit = (doc) => {
    let inputDetails = {};
    setEditData(doc);
    console.log(doc);
    doc?.text?.map((field) => {
      inputDetails[field.name] = field.value;
    });
    setFieldsData(inputDetails);
    toggleCreateModal("edit");
  };

  const handleEditData = (doc) => {
    let editedDoc = {
      ...doc,
      text: doc?.text?.map((item) => ({
        ...item,
        value: fieldsData[item.name],
      })),
    };
    console.log(editedDoc);
    setEditData(editedDoc);
  };

  const deleteDocument = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/document/${editData._id}`);
      dispatch(fetchAllDocuments(dbId, colId));
      setIsLoading(false);
      dispatch(fetchAllDocuments({ colId, dbId }));
      toggleDeleteModal();
      // toggleSuccessModal();
      toast.success(res.data?.message);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    dispatch(fetchAllDocuments({ colId, dbId }));
    dispatch(fetchCollectionDetails(colId, dbId));
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
      {documentLoading ? (
        <div className="flex items-center justify-center h-screen max-h-screen">
          <Loader />
        </div>
      ) : (
        <div>
          {!documents.length && (
            <div className="flex items-center justify-center h-screen max-h-screen">
              <p>Empty</p>
            </div>
          )}
          <div className="grid mt-8 lg:grid-cols-3 gap-8 md:grid-cols-2">
            {documents?.map((document, idx) => (
              <DatabaseCard>
                <div className="p-6">
                  <div className="my-8 space-y-1">
                    {document.text?.length > 0 &&
                      document.text.map((file) => (
                        <p className="text-lg">
                          {file.name} <b>{file.value}</b>
                        </p>
                      ))}
                    {document.files?.length > 0 &&
                      document.files?.map((file) => (
                        <div className="flex items-center gap-4 my-2 relative z-40">
                          <p className="text-lg capitalize whitespace-nowrap">
                            {file.name}:
                          </p>
                          {(file.fileType === "image" || file.fileType === "video") && (
                            <a
                              href={file.url}
                              className="p-2 px-4 rounded-md border-2 border-blue-900 text-sm cursor-pointer"
                              target="__blank"
                              download={true}
                            >
                              {"View"}
                            </a>
                          )}
                          <button
                            className="p-2 px-4 rounded-md border-2 border-blue-900 text-sm cursor-pointer"
                            disabled={loading}
                            onClick={() => downloadFile(file.url)}
                          >
                            {loading ? "Downloading..." : "Download"}
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="relative h-8 z-50">
                    <div className="flex justify-end">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 font-light bg-gray-200 text-gray-400 rounded-md"
                          onClick={() => handleEdit(document)}
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          className="p-2 font-light bg-gray-200 text-gray-400 rounded-md"
                          onClick={() => {
                            setEditData(document);
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
        </div>
      )}
      <ModalContainer show={createModal} close={closeCreateModal}>
        <div>
          <div className="text-center">
            <h3 className="text-2xl font-medium text-[#1400FF] uppercase">
              {mode === "create" ? "Create Document" : "Edit Dociment"}
            </h3>
          </div>
          <form className="my-8 space-y-4" onSubmit={createDocument}>
            {collectionSchema?.fields?.map((field) =>
              cannotBeUnique(field.datatype) ? (
                <SchemaInputs
                  type={field.dataType}
                  label={field.name}
                  name={field.name}
                  value={fieldsData[field.name]}
                  onChange={handleField}
                />
              ) : (
                <SchemaInputs
                  type={field.dataType}
                  label={field.name}
                  name={field.name}
                  // value={fieldsData[field.name]}
                  onChange={handleField}
                />
              )
            )}
            <div className="flex justify-center gap-8 mt-8">
              <button
                type="reset"
                className="h-10 w-24 border-2 border-main rounded-xl text-main barlow text-base font-normal"
                color={"#ffffff"}
                onClick={() => {
                  setFieldsData({});
                  toggleCreateModal();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-10 w-24 bg-main rounded-xl text-white barlow font-normal text-lg"
                disabled={isLoading}
                color={"#ffffff"}
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
          </form>
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
            Are you sure you want to delete document? Action cannot be undone.
          </p>
          <div className="flex justify-center gap-8 mt-4">
            <button
              className="h-10 w-24 bg-main rounded-xl text-white barlow font-normal text-lg"
              color={"#ffffff"}
              onClick={() => {
                toggleDeleteModal();
              }}
            >
              No
            </button>
            <button
              className="h-10 w-24 border-2 border-main rounded-xl text-main barlow text-base font-normal"
              color={"#ffffff"}
              onClick={() => deleteDocument()}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="text-white flex items-center justify-center">
                  <ClipLoader size={20} color="#00f" />
                </span>
              ) : (
                "Yes"
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

const SchemaInputs = ({ type, options, style, label, ...restProps }) => {
  return (
    <div>
      {type === "text" ? (
        <div className="flex items-center gap-4">
          <label className="font-semibold whitespace-nowrap">{label}:</label>
          <input
            type="text"
            className="h-10 border-2 rounded-md px-4 w-full"
            {...restProps}
          />
        </div>
      ) : type === "numeric value" ? (
        <div className="flex items-center gap-4">
          <label className="font-semibold whitespace-nowrap">{label}:</label>
          <input
            type="number"
            className="h-10 border-2 rounded-md px-4 w-full"
            {...restProps}
          />
        </div>
      ) : type === "image" ? (
        <div className="flex items-center gap-4">
          <label className="font-semibold whitespace-nowrap">{label}:</label>
          <input
            type="file"
            className="h-10 border-2 rounded-md px-4 w-full"
            {...restProps}
          />
        </div>
      ) : type === "video" ? (
        <div className="flex items-center gap-4">
          <label className="font-semibold whitespace-nowrap">{label}:</label>
          <input
            type="file"
            className="h-10 border-2 rounded-md px-4 w-full"
            {...restProps}
          />
        </div>
      ) : type === "document" ? (
        <div className="flex items-center gap-4">
          <label className="font-semibold whitespace-nowrap">{label}:</label>
          <input
            type="file"
            className="h-10 border-2 rounded-md px-4 w-full"
            {...restProps}
          />
        </div>
      ) : (
        type === "link to another document" && (
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
        )
      )}
    </div>
  );
};
