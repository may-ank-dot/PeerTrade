import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SplitText from "../components/inComp/SplitText";
import { motion } from "framer-motion";
import BlurText from "../components/inComp/BlurText";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post('/users/login', { email, password });
      console.log("login Success");
      login(response.data);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login Error", err);
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
        <h2 className="lex text-4xl">
          <SplitText text="Login" />
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="w-full mb-5">
          <label className="block mb-2 text-white font-semibold">Email</label>
          <input
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="w-full mb-8">
          <label className="block mb-2 text-white font-semibold">Password</label>
          <input
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all hover:scale-105 duration-300 ease-in-out"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
