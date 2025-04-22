import React from "react";
import {Link,Navigate,useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Navbar = () => {
    // get user and logout function
    const {user,logout} = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    const go = () =>{
        navigate("/mylistings")
    }
    return (
        <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-4xl font-bold">PeerTrade</Link>
            

           <div className="flex gap-4 items-center">
                {user ? (<>
                    <Link to="/addlistings" className="hover:underline">AddProduct</Link>
                    <Link to="/mylistings" className="hover:underline">MyProducts</Link>
                    <span>Welcome,{user.name}</span>
                    <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                        Logout
                    </button>
                </>):(<>
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/listings" className="hover:underline">Products</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                </>)}
            </div>
        </nav> 
    )
}

export default Navbar;