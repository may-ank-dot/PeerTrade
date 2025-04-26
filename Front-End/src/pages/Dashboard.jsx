import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Mon', listings: 2 },
  { name: 'Tue', listings: 3 },
  { name: 'Wed', listings: 1 },
  { name: 'Thu', listings: 4 },
  { name: 'Fri', listings: 2 },
  { name: 'Sat', listings: 5 },
  { name: 'Sun', listings: 3 },
];

const recentListings = [
  { id: 1, title: "Physics Book", price: "$20", status: "Available" },
  { id: 2, title: "Laptop Charger", price: "$10", status: "Sold" },
  { id: 3, title: "Desk Lamp", price: "$15", status: "Available" },
  { id: 4, title: "iPad Case", price: "$8", status: "Sold" },
  { id: 5, title: "Math Notes", price: "$5", status: "Available" },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen bg-gray-950 overflow-x-hidden">
      

      {/* Content */}
      <div className="relative z-10 ml-20 md:ml-64 p-6">

        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-8">Welcome, {user?.name || "PeerTrader"}!</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-500 p-6 rounded-xl shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-2">Total Listings</h2>
            <p className="text-4xl font-bold">24</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-indigo-500 p-6 rounded-xl shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-2">Sold Products</h2>
            <p className="text-4xl font-bold">10</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-teal-400 p-6 rounded-xl shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-2">Active Products</h2>
            <p className="text-4xl font-bold">14</p>
          </div>
        </div>

        {/* Graph and Profile Section */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          
          {/* Chart */}
          <div className="md:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-white text-2xl mb-6">Listings This Week</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line type="monotone" dataKey="listings" stroke="#00FFFF" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Profile Card */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white flex flex-col items-center justify-center">
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=User"
              alt="User"
              className="rounded-full w-24 h-24 mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{user?.name}</h2>
            <p className="text-gray-400 mb-1">{user?.email}</p>
            <p className="text-gray-500 text-sm">Member since 2025</p>
            <Link to="/profile" className="mt-4 text-cyan-400 hover:underline">
              View Profile
            </Link>
          </div>

        </div>

        {/* Recent Listings Table */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10">
          <h2 className="text-white text-2xl mb-6">Recent Listings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentListings.map((listing) => (
                  <tr key={listing.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                    <td className="px-4 py-2">{listing.title}</td>
                    <td className="px-4 py-2">{listing.price}</td>
                    <td className={`px-4 py-2 ${listing.status === "Sold" ? "text-red-400" : "text-green-400"}`}>
                      {listing.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
