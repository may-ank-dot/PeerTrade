import React from "react";
import TrueFocus from "../components/inComp/TrueFocus";

const Home = () => {
  return (
    <div className="text-white bg-gray-900 h-screen bg-[url(../../public/1234.jpg)] bg-blend-darken bg-cover bg-center bg-no-repeat">
      <div className="home">
        <div className="Hero">
          <div className="grid grid-cols-2 h-dvh px-10 py-20">
            <div className="flex flex-col justify-center">
              <TrueFocus
                sentence="Peer Trade"
                pauseBetweenAnimations={3}
                blurAmount={2}
                borderColor="yellow"
              />
              <p className="mt-8 italic flex justify-center text-blue-400 text-2xl">
                PeerTrade is a platform to rent, sell, or buy items from peers...
              </p>
            </div>

            <div className="flex flex-col justify-center items-end text-right">
              <div className="details ml-20">
                <p className="text-l leading-5 italic font-semibold text-justify tracking-normal">
                  <a className="underline hover:decoration-blue-400 decoration-2 underline-offset-1">PeerTrade is a full-stack web platform </a>
                  designed exclusively for college students to buy, sell, or rent items within their campus community. 
                  The platform fosters sustainable reuse of resources and builds a trustworthy peer economy among students.
                  Built with a focus on simplicity, security, and student-to-student interactions, PeerTrade 
                  allows users to list products (like books, electronics, fashion, etc.), browse listings, and directly connect 
                  with other verified students.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
