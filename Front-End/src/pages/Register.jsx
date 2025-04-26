import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import SplitText from "../components/inComp/SplitText";
import { motion } from "framer-motion";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/users/register", { name, email, password });
      console.log("Registration success", response.data);
      login(response.data.user);
      navigate("/listings");
    } catch (error) {
      console.error("Registration error", error);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-black opacity-80"></div>

      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 bg-gray-900 bg-opacity-70 p-10 rounded-2xl shadow-lg w-[90%] max-w-md flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="font-bold text-4xl">
          <SplitText text="Register" />
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="w-full mb-5">
          <label className="block mb-2 text-white font-semibold">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="w-full mb-5">
          <label className="block mb-2 text-white font-semibold">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="w-full mb-8">
          <label className="block mb-2 text-white font-semibold">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all hover:scale-105 duration-300 ease-in-out"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </motion.form>
    </div>
  );
};

export default Register;
