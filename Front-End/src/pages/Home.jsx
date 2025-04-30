import React, { useContext } from "react";
import BlurText from "../components/inComp/BlurText";
import Threads from "../components/inComp/VertexShader";
import { Link } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContex";
import ScrollVelocity from "../components/inComp/FramerMotion";

const Home = () => {
  const { collapsed } = useContext(SidebarContext);
  const categoriesLine1 = [
  "Books Electronics Fashion Stationery"
];
const categoriesLine2 = [
  "Gadgets Sports Gear Services Furniture"
];
  return (
    <div className={`relative min-h-screen bg-gray-950 overflow-x-hidden transition-all duration-300 ${
      collapsed ? "ml-[70px] w-[95%]" : "ml-[260px] "
    }`}>

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-black opacity-80"></div>
      <div className="absolute inset-0 z-0 ">
        <Threads />
      </div>

      <div className="relative z-10 ml-4 md:ml-2 py-6">

        <div className="flex flex-col justify-center items-center min-h-[75vh] text-center">
          <BlurText
            text="PeerTrade"
            className="title text-9xl font-bold tracking-widest hover:scale-150 transition duration-500 hover:text-cyan-400"
          />

          <p className="mt-8 font-mono tracking-tighter text-blue-300 text-2xl font-bold">
            Rent, sell, or buy from your peers in seconds...
          </p>

          <div className="mt-12">
            <Link to="/listings">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold transition">
                Explore Products 
              </button>
            </Link>
          </div>
        </div>
        <ScrollVelocity texts={categoriesLine1} className="text-5xl font-semibold lex"/>
        <ScrollVelocity texts={categoriesLine2} velocity={-92} className="text-5xl font-semibold lex"/>
        <div className="mt-32 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Why PeerTrade?</h2>
          <p className="text-gray-400 leading-8 px-6">
            We help college students sustainably exchange goods like books, electronics, fashion, and more.  
            Built with simplicity, security, and community in mind, PeerTrade fosters peer-to-peer trust 
            and empowers a circular student economy.
          </p>
        </div>

        <div className="mt-32 max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10 text-center text-white">Features</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition text-center">
              <h3 className="text-2xl text-cyan-400 font-semibold mb-4">Verified Students</h3>
              <p className="text-gray-400">Only college-verified users can list or buy products, ensuring maximum safety.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition text-center">
              <h3 className="text-2xl text-cyan-400 font-semibold mb-4">Zero Commission</h3>
              <p className="text-gray-400">100% of the price goes to the seller. PeerTrade doesn't charge anything!</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition text-center">
              <h3 className="text-2xl text-cyan-400 font-semibold mb-4">Smart Search</h3>
              <p className="text-gray-400">Easily find exactly what you need with smart filters and real-time results.</p>
            </div>
          </div>
        </div>

        <div className="mt-32 max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-10 text-white">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">1. Sign Up</h3>
              <p className="text-gray-400">Create your free account and verify your student identity.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">2. List or Browse</h3>
              <p className="text-gray-400">Post products you want to sell or rent. Browse others' listings easily!</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">3. Connect</h3>
              <p className="text-gray-400">Chat with buyers/sellers and complete your transaction safely.</p>
            </div>
          </div>
        </div>

        <div className="mt-32 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl text-white font-bold mb-6">Ready to join the marketplace?</h2>
          <Link to="/register">
            <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-semibold transition">
              Get Started
            </button>
          </Link>
        </div>

        <div className="mt-20"></div>
      </div>
    </div>
  );
};

export default Home;