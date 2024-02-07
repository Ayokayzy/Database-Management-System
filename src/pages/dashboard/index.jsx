import React from "react";
import DashboardCard from "../../components/dashboard-card/dashboard-card";

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        <DashboardCard img={"users.png"} stats={`${271} people`} />
        <DashboardCard img={"db.png"} stats={`${271} in total`} />
        <DashboardCard img={"collection.png"} stats={`${271} in total`} />
        <DashboardCard img={"docs.png"} stats={`${271} in total`} />
      </div>

      <section className="mt-8">
        <h2 className="font-semibold text-2xl">All Users</h2>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xl text-gray-700 capitalize bg-gray-50 whitespace-nowrap">
              <tr>
                <th scope="col" className="px-6 py-3">
                  mame
                </th>
                <th scope="col" className="px-6 py-3">
                  gender
                </th>
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
              <tr className="bg-white border-b shadow-lg">
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">Male</td>
                <td className="px-6 py-4">20</td>
                <td className="px-6 py-4">20</td>
                <td className="px-6 py-4">20</td>
                <td className="px-6 py-4">johndoe@gmail.com</td>
                <td className="px-6 py-4">+234 810 111 2222</td>
                <td className="px-6 py-4">
                  <span
                    className="te text-red-500"
                  >
                    Block User
                  </span>
                </td>
              </tr>
              <tr className="bg-white border-b shadow-lg">
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">Male</td>
                <td className="px-6 py-4">20</td>
                <td className="px-6 py-4">20</td>
                <td className="px-6 py-4">20</td>
                <td className="px-6 py-4">johndoe@gmail.com</td>
                <td className="px-6 py-4">+234 810 111 2222</td>
                <td className="px-6 py-4">
                  <span
                    className="te text-red-500"
                  >
                    Block User
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
