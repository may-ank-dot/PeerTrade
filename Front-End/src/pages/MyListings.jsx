import { useContext, useEffect, useState } from "react";
import API from "../services/api";
import { SidebarContext } from "../context/SidebarContex";
import Card from "../components/Card"; // assuming you have a reusable Card component

const MyListings = () => {
  const [myListings, setMyListings] = useState([]);
  const { collapsed } = useContext(SidebarContext);

  useEffect(() => {
    API.get("/products/my/:id")
      .then((res) => setMyListings(res.data))
      .catch((err) => console.error("Failed to fetch your listings", err));
  }, []);

  return (
    <div
      className={`flex min-h-screen mt-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white ${
        collapsed ? "ml-[70px]" : "ml-[260px]"
      }`}
    >
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-8">
          My Listings
        </h1>

        {myListings.length === 0 ? (
          <p className="text-lg text-gray-400">You haven’t listed any items yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {myListings.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
