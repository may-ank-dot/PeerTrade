import React, { useContext, useState } from "react";
import BlurText from "../components/inComp/BlurText";
import Threads from "../components/inComp/VertexShader";
import { Link, useNavigate } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContex";
import ScrollVelocity from "../components/inComp/FramerMotion";
import { ArrowRight, Search } from "react-feather";

const Home = () => {
  const { collapsed } = useContext(SidebarContext);
  const [query,setQuery]= useState(""); 
  const navigate = useNavigate();
  const categoriesLine1 = [
    "Books Electronics Fashion Stationery"
  ];
  const categoriesLine2 = [
    "Gadgets Sports Gear Services Furniture"
  ];
  
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/listings/search?query=${query}`);
  };

  return (
    <div className={`relative min-h-screen bg-gray-950 overflow-x-hidden transition-all duration-300 ${
      collapsed ? "ml-[70px] w-[95%]" : "ml-[260px] "
    }`}>
      {/* Background gradient and vertex shader */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-gray-900 to-black opacity-80"></div>
      <div className="absolute inset-0 z-0">
        <Threads />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 ml-4 md:ml-2 py-6">
        {/* Hero section */}
        <div className="flex flex-col justify-center items-center min-h-[75vh] text-center">
          <BlurText
            text="PeerTrade"
            className="text-9xl font-semibold tracking-widest hover:scale-150 transition duration-500 hover:text-cyan-400"
          />

          <p className="mt-8 font-mono tracking-tighter text-cyan-300 text-2xl font-bold">
            Rent, sell, or buy from your peers in seconds...
          </p>

          {/* Search bar */}
            <div className="mt-12 w-full max-w-2xl mx-auto px-4">
              <form onSubmit={handleSearch}>
                <div className="flex bg-gray-800/80 backdrop-blur-sm p-2 rounded-xl shadow-xl border border-cyan-900/30">
                  <input
                    type="text"
                    value={query}
                    placeholder="Search for products..."
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent border-0 mr-2 focus:ring-0 text-white pl-4"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition-all"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </form>
            </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link to="/listings">
              <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-bold transition-all duration-200 shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center">
                Explore Products
                <ArrowRight className="ml-2" size={18} />
              </button>
            </Link>
            <Link to="/addlistings">
              <button className="px-6 py-3 bg-transparent hover:bg-gray-800 border border-cyan-500 rounded-lg text-cyan-400 font-semibold transition-all duration-200">
                Sell Something
              </button>
            </Link>
          </div>
        </div>

        {/* Scrolling category text */}
        <ScrollVelocity texts={categoriesLine1} className="text-5xl font-semibold text-cyan-500/80"/>
        <ScrollVelocity texts={categoriesLine2} velocity={-92} className="text-5xl font-semibold text-cyan-500/80"/>
        
        {/* Why PeerTrade section */}
        <div className="mt-32 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-cyan-400">Why PeerTrade?</h2>
          <p className="text-gray-400 leading-8 px-6">
            We help college students sustainably exchange goods like books, electronics, fashion, and more.  
            Built with simplicity, security, and community in mind, PeerTrade fosters peer-to-peer trust 
            and empowers a circular student economy.
          </p>
        </div>
        
        {/* Features section */}
        <div className="mt-32 max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10 text-center text-cyan-400">Features</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-800/50 p-6 rounded-2xl hover:scale-105 transition text-center border border-double border-cyan-900/50 hover:border-cyan-500 shadow-md hover:shadow-xl hover:shadow-cyan-900/20 group">
              <h3 className="text-2xl text-cyan-400 font-semibold mb-4">Verified Students</h3>
              <p className="text-gray-400">Only college-verified users can list or buy products, ensuring maximum safety.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-2xl hover:scale-105 transition text-center border border-double border-cyan-900/50 hover:border-cyan-500 shadow-md hover:shadow-xl hover:shadow-cyan-900/20 group">
              <h3 className="text-2xl text-cyan-400 font-semibold mb-4">Zero Commission</h3>
              <p className="text-gray-400">100% of the price goes to the seller. PeerTrade doesn't charge anything!</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-2xl hover:scale-105 transition text-center border border-double border-cyan-900/50 hover:border-cyan-500 shadow-md hover:shadow-xl hover:shadow-cyan-900/20 group">
              <h3 className="text-2xl text-cyan-400 font-semibold mb-4">Smart Search</h3>
              <p className="text-gray-400">Easily find exactly what you need with smart filters and real-time results.</p>
            </div>
          </div>
        </div>
        
        {/* How it works section */}
        <div className="mt-32 max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-10 text-cyan-400">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="text-center bg-gray-800/30 p-6 rounded-xl border border-cyan-900/30 hover:border-cyan-500 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400 font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Sign Up</h3>
              <p className="text-gray-400">Create your free account and verify your student identity.</p>
            </div>
            <div className="text-center bg-gray-800/30 p-6 rounded-xl border border-cyan-900/30 hover:border-cyan-500 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400 font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">List or Browse</h3>
              <p className="text-gray-400">Post products you want to sell or rent. Browse others' listings easily!</p>
            </div>
            <div className="text-center bg-gray-800/30 p-6 rounded-xl border border-cyan-900/30 hover:border-cyan-500 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400 font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Connect</h3>
              <p className="text-gray-400">Chat with buyers/sellers and complete your transaction safely.</p>
            </div>
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="mt-32 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl text-cyan-400 font-bold mb-6">Ready to join the marketplace?</h2>
          <Link to="/register">
            <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/20">
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