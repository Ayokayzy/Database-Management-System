import React from "react";
import { useSelector } from "react-redux";
import {
  selectAllusers,
  selectUsersLoading,
} from "../../data/selectors/adminSelector";

const AllUsers = () => {
  const users = useSelector(selectAllusers);
  console.log({ users });
  const usersLoading = useSelector(selectUsersLoading);
  return (
    <div className="p-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xl text-gray-700 capitalize bg-gray-50 whitespace-nowrap">
            <tr>
              <th scope="col" className="px-6 py-3">
                mame
              </th>
              {/* <th scope="col" className="px-6 py-3">
                gender
              </th> */}
              <th scope="col" className="px-6 py-3">
                Documents
              </th>
              <th scope="col" className="px-6 py-3">
                databases
              </th>
              <th scope="col" className="px-6 py-3">
                collections
              </th>
              <th scope="col" className="px-6 py-3">
                email address
              </th>
              <th scope="col" className="px-6 py-3">
                phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-lg font-light">
            {users?.users
              ?.filter((user) => user.admin === false)
              .map((user) => (
                <tr className="bg-white border-b shadow-lg whitespace-nowrap">
                  <td className="px-6 py-4">
                    {user.firstname + " " + user.lastname}
                  </td>
                  {/* <td className="px-6 py-4">Male</td> */}
                  <td className="px-6 py-4">{user.noOfDocuments}</td>
                  <td className="px-6 py-4">{user.noOfDBs}</td>
                  <td className="px-6 py-4">{user.noOfCollections}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        user.deactivated ? "text-green-400" : "text-red-500"
                      }`}
                    >
                      {user.deactivated ? "Activate User" : "Block User"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
