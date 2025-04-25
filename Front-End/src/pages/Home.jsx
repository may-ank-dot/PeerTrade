import React from "react";
import BlurText from "../components/inComp/BlurText";
import Threads from "../components/inComp/VertexShader";
import Particles from "../components/inComp/Particles";
const Home = () => {
  return (
    <div className="text-white bg-gray-900 h-screen bg-[url(../../1234.jpg)] bg-blend-darken bg-cover bg-center bg-no-repeat ">
      <div className="flex flex-col justify-center items-center h-full text-center px-4">
        <BlurText text="PeerTrade" className="text-8xl transition-all hover:text-shadow-lg hover:text-teal-600 hover:text-9xl text-shadow-gray-600 duration-200 delay-200 tracking-wider font-serif font-semibold"/>
        <p className="mt-8 italic flex justify-center text-blue-400 text-2xl hover:underline hover:decoration-white">
          platform to rent, sell, or buy items from peers...
        </p>
      </div>
      <div className="h-screen">
        <Threads/>
        <div className="homeBody ">
          <div className="w-full  ">
            <p className="text-2xl w-5xl pb-20 text-center italic font-normal leading-7 tracking-normal mx-auto ">
              The platform fosters sustainable reuse of resources and builds a trustworthy peer economy among students.
              Built with a focus on simplicity, security, and student-to-student interactions, PeerTrade 
              allows users to list products (like books, electronics, fashion, etc.), browse listings, and directly connect 
              with other verified students."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
