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
            <Link to="/" className="text-lg font-bold">PeerTrade</Link>
            

           <div className="flex gap-4 items-center">
                {user ? (<>
                    <span>Welcome,{user.name}</span>
                    <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                        Logout
                    </button>
                </>):(<>
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                </>)}
            </div>
        </nav> 
    )
}

export default Navbar;