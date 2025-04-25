import React from "react";
import TrueFocus from "../components/inComp/TrueFocus";

const Home = () => {
  return (
    <div className="text-white bg-gray-900 h-screen">
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
              <p className="mt-8  flex justify-center text-green-300 text-2xl">
                PeerTrade is a platform to rent, sell, or buy items from peers...
              </p>
            </div>

            <div className="flex flex-col justify-center items-end text-right">
              <div className="details">
                <p className="text-xl font-semibold">Details</p>
                {/* Add more detail content here */}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
