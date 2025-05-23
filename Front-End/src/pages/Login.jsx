import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SplitText from "../components/inComp/SplitText";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle } from "react-feather";

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
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-gray-900 to-black opacity-80"></div>
      <motion.div 
        className="absolute w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl"
        initial={{ x: "-50vw", y: "-20vh" }}
        animate={{ x: "-40vw", y: "-15vh" }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-blue-600/10 blur-3xl"
        initial={{ x: "50vw", y: "20vh" }}
        animate={{ x: "40vw", y: "25vh" }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />

      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 bg-gray-900/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl shadow-cyan-900/20 border border-cyan-900/30 w-[90%] max-w-md flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-4xl text-cyan-400 mb-6">
          <SplitText text="Login" />
        </h2>

        {error && (
          <div className="w-full p-3 mb-6 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center">
            <AlertCircle size={18} className="text-red-400 mr-2" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <div className="w-full mb-5">
          <label className="block mb-2 text-gray-300 font-semibold">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/70 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none border border-gray-700 transition-all"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="w-full mb-8">
          <label className="block mb-2 text-gray-300 font-semibold">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/70 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none border border-gray-700 transition-all"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <button
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all hover:scale-105 duration-300 ease-in-out shadow-lg hover:shadow-cyan-500/20"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-6 text-center w-full">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Register
            </Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
};
export default Login;