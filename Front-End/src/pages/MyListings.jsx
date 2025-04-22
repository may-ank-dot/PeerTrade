import { useEffect,useState } from "react";
import API from "../services/api";

const MyListings = () => {
    const [myListings,setMyListings] = useState([]);
    useEffect(() => {
        API.get("/products/my",{withCredentials:true})
            .then(res=>setMyListings(res.data))
            .catch(err=>console.error("failed to fetch your lisitings",err));
    },[]);
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My lisitings</h2>
            {myListings.length === 0 ? 
                (<p>No listings found</p>
                ):(
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {myListings.map(listings => (
                        <div key={listings.id} className="p-4 border rounded shadow">
                            <h3 className="font-semibold">{listings.title}</h3>
                            <p>{listings.description}</p>
                            <p>{listings.price}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}
export default MyListings; 