import React from "react";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";

const DashboardCard = ({ img, stats }) => {
  return (
    <div className="bg-white rounded-md p-4 h-32 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <p className="font-medium text-lg">Users</p>
        <img src={require(`../../assets/${img}`)} alt="" />
      </div>
      <div className="flex justify-between items-center">
        <p className="">{stats}</p>
        <div className="flex items-center">
          +0,7%
          <span>
            <IoIosArrowRoundUp />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
