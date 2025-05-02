import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="flex items-center space-x-2">
        <img src="/logoo.png" className="h-10 w-10" alt="PeerTrade Logo" />
        <p className="text-2xl font-bold hover:scale-110 transition">PeerTrade</p>
      </Link>

      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <span className="hidden sm:inline">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-teal-400 transition">Login</Link>
            <Link to="/register" className="hover:text-teal-400 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;