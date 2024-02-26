import React from "react";
import DashboardCard from "../../components/dashboard-card/dashboard-card";
import { useSelector } from "react-redux";
import {
  selectAllusers,
  selectDbState,
  selectUsersLoading,
} from "../../data/selectors/adminSelector";

const Dashboard = () => {
  const users = useSelector(selectAllusers);
  const dbState = useSelector(selectDbState);
  const usersLoading = useSelector(selectUsersLoading);
  console.log(users, dbState, usersLoading);

  return (
    <div>
      {usersLoading ? (
        <div className="h-screen flex items-center justify-center">
          loading...
        </div>
      ) : (
        <div className="p-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            <DashboardCard
              title={"Users"}
              img={"users.png"}
              stats={`${users?.noOfUsers} people`}
            />
            <DashboardCard
              title={"Databases"}
              img={"db.png"}
              stats={`${dbState.DBs} in total`}
            />
            <DashboardCard
              title={"Collections"}
              img={"collection.png"}
              stats={`${dbState.collections} in total`}
            />
            <DashboardCard
              title={"Documents"}
              img={"docs.png"}
              stats={`${dbState.documents} in total`}
            />
          </div>

          <section className="mt-8">
            <h2 className="font-semibold text-2xl">All Users</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xl text-gray-700 capitalize bg-gray-50 whitespace-nowrap">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      name
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
                        <td className="px-6 py-4">20</td>
                        <td className="px-6 py-4">20</td>
                        <td className="px-6 py-4">20</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.phone}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`${
                              user.deactivated
                                ? "text-green-400"
                                : "text-red-500"
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
          </section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
