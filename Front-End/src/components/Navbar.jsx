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
        <nav className="bg-gray-800 text-white px-4  flex justify-between items-center">
            <Link to="/" className="font-bold">
                <img src="../../logoo.png" className="logo h-15 w-15 inline-flex justify-center"/>
                <p className="inline-block transition-all duration-300 hover:scale-130 ">PeerTrade</p>
            </Link>

           <div className="flex gap-4 items-center">
                {user ? (<>
                    <Link to="/addlistings" className=" transition-all duration-300 hover:scale-130 ">AddProduct</Link>
                    <Link to="/mylistings" className=" transition-all duration-300 hover:scale-130 ho">MyProducts</Link>
                    <span>Welcome,{user.name}</span>
                    <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                        Logout
                    </button>
                </>):(<>
                    <Link to="/listings" className="transition-all duration-300 hover:scale-130">Products</Link>
                    <Link to="/login" className="transition-all duration-300 hover:scale-130">Login</Link>
                    <Link to="/register" className="transition-all duration-300 hover:scale-130">Register</Link>
                </>)}
            </div>
        </nav> 
    )
}

export default Navbar;