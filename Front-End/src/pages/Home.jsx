import React, { useContext, useState } from "react";
import BlurText from "../components/inComp/BlurText";
import Threads from "../components/inComp/VertexShader";
import { Link, useNavigate } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContex";
import ScrollVelocity from "../components/inComp/FramerMotion";
import { ArrowRight, Search, Shield, Zap, Target, Users, Award, TrendingUp } from "react-feather";

const Home = () => {
  const { collapsed } = useContext(SidebarContext);
  const [query, setQuery] = useState(""); 
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
    <div className={`relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 overflow-x-hidden transition-all duration-300 ${
      collapsed ? "ml-[70px] w-[95%]" : "ml-[260px] "
    }`}>
      {/* Enhanced background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-pink-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-cyan-900/20 via-transparent to-blue-900/20"></div>
      
      {/* Animated background threads */}
      <div className="absolute inset-0 z-0">
        <Threads />
      </div>

      {/* Floating orbs for visual appeal */}
      <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <div className="relative z-10 ml-4 md:ml-2 py-6">
        {/* Hero section */}
        <div className="flex flex-col justify-center items-center min-h-[75vh] text-center">
          <BlurText
            text="PeerTrade"
            className="text-8xl md:text-9xl font-bold tracking-widest hover:scale-110 transition duration-700 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-pink-400 hover:via-cyan-400 hover:to-purple-400"
          />

          <div className="mt-8 space-y-2">
            <p className="font-mono tracking-tight text-slate-300 text-xl md:text-2xl font-semibold">
              Rent, sell, or buy from your peers in seconds...
            </p>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              The most trusted student marketplace for college essentials
            </p>
          </div>

          <div className="mt-12 w-full max-w-2xl mx-auto px-4">
            <form onSubmit={handleSearch}>
              <div className="flex bg-slate-800/60 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
                <input
                  type="text"
                  value={query}
                  placeholder="Search for textbooks, electronics..."
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-0 mr-3 focus:ring-0 text-white pl-4 text-lg placeholder-slate-400 focus:placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center hover:scale-105"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <Link to="/listings">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-2xl text-white font-bold transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30 flex items-center justify-center hover:scale-105 hover:-translate-y-1">
                Explore Products
                <ArrowRight className="ml-2" size={20} />
              </button>
            </Link>
            <Link to="/addlistings">
              <button className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 border-2 border-purple-500/50 hover:border-purple-400 rounded-2xl text-purple-300 hover:text-purple-200 font-bold transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-purple-500/20">
                Sell Something
              </button>
            </Link>
          </div>
        </div>

        {/* Enhanced Scrolling category text */}
        <div className="mt-16 space-y-4">
          <ScrollVelocity 
            texts={categoriesLine1} 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400/70 to-teal-400/70 bg-clip-text text-transparent"
          />
          <ScrollVelocity 
            texts={categoriesLine2} 
            velocity={-92} 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400/70 to-pink-400/70 bg-clip-text text-transparent"
          />
        </div>
        
        <div className="mt-32 max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Why PeerTrade?
          </h2>
          <p className="text-slate-300 text-lg leading-8 px-6 max-w-4xl mx-auto">
            We help college students sustainably exchange goods like books, electronics, fashion, and more.  
            Built with simplicity, security, and community in mind, PeerTrade fosters peer-to-peer trust 
            and empowers a circular student economy where everyone wins.
          </p>
        </div>
        
        {/* Enhanced Features section */}
        <div className="mt-32 max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 p-8 rounded-3xl hover:scale-105 transition-all duration-300 text-center border border-slate-600/30 hover:border-cyan-400/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-900/20 group backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-2xl text-cyan-400 font-bold mb-4">Verified Students</h3>
              <p className="text-slate-300 leading-relaxed">Only college-verified users can list or buy products, ensuring maximum safety and trust in every transaction.</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 p-8 rounded-3xl hover:scale-105 transition-all duration-300 text-center border border-slate-600/30 hover:border-emerald-400/50 shadow-xl hover:shadow-2xl hover:shadow-emerald-900/20 group backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-emerald-400" size={32} />
              </div>
              <h3 className="text-2xl text-emerald-400 font-bold mb-4">Zero Commission</h3>
              <p className="text-slate-300 leading-relaxed">100% of the price goes to the seller. PeerTrade doesn't charge anything! Keep every rupee you earn.</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 p-8 rounded-3xl hover:scale-105 transition-all duration-300 text-center border border-slate-600/30 hover:border-purple-400/50 shadow-xl hover:shadow-2xl hover:shadow-purple-900/20 group backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="text-purple-400" size={32} />
              </div>
              <h3 className="text-2xl text-purple-400 font-bold mb-4">Smart Search</h3>
              <p className="text-slate-300 leading-relaxed">Easily find exactly what you need with smart filters, categories, and lightning-fast real-time results.</p>
            </div>
          </div>
        </div>
        
        {/* Enhanced How it works section */}
        <div className="mt-32 max-w-6xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center bg-gradient-to-br from-slate-800/30 to-slate-900/50 p-8 rounded-3xl border border-slate-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/20 group backdrop-blur-sm hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-400 font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <div className="mb-6">
                <Users className="text-cyan-400 mx-auto" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Sign Up</h3>
              <p className="text-slate-300 leading-relaxed">Create your free account and verify your student identity for instant access to the marketplace.</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-slate-800/30 to-slate-900/50 p-8 rounded-3xl border border-slate-600/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20 group backdrop-blur-sm hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-400 font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <div className="mb-6">
                <Award className="text-purple-400 mx-auto" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-purple-400 mb-4">List or Browse</h3>
              <p className="text-slate-300 leading-relaxed">Post products you want to sell or rent. Browse thousands of listings from fellow students!</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-slate-800/30 to-slate-900/50 p-8 rounded-3xl border border-slate-600/30 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/20 group backdrop-blur-sm hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400 font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <div className="mb-6">
                <TrendingUp className="text-emerald-400 mx-auto" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Connect</h3>
              <p className="text-slate-300 leading-relaxed">Chat with buyers/sellers and complete your transaction safely within your campus community.</p>
            </div>
          </div>
        </div>
        
        {/* Enhanced Final CTA */}
        <div className="mt-32 flex flex-col justify-center items-center text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ready to join the marketplace?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Join thousands of students already saving money and finding great deals
            </p>
          </div>
          <Link to="/register">
            <button className="px-12 py-4 bg-gradient-to-r from-blue-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 rounded-2xl text-white font-bold transition-all duration-300 shadow-2xl hover:shadow-purple-500/30 hover:scale-105 hover:-translate-y-1 text-lg">
              Get Started Today
            </button>
          </Link>
        </div>
        
        <div className="mt-20"></div>
      </div>
    </div>
  );
};

export default Home;