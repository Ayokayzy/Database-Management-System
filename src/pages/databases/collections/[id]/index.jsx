import React from "react";
import { IoIosAdd } from "react-icons/io";
import DatabaseCard from "../../../../components/database-card/database-card";

import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Document = () => {
  const navigate = useNavigate();
  return (
    <div className="m-4 min-h-screen bg-white p-8">
      <div className="flex justify-between">
        <h3 className="font-medium text-xl uppercase">All Document</h3>
        <button
          type="submit"
          className="h-10 bg-[#1E13FE] rounded-xl text-white barlow text-base font-normal flex items-center gap-4 px-8"
          color={"#ffffff"}
        >
          <span>
            <IoIosAdd />
          </span>
          create collection
        </button>
      </div>
      <div className="grid mt-8 lg:grid-cols-3 gap-8 md:grid-cols-2">
        <DatabaseCard handleClick={() => navigate("")}>
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
    </div>
  );
};

export default Document;
