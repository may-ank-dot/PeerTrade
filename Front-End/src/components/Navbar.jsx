import React from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import List from "./inComp/List";

const Navbar = () => {
    // get user and logout function
    const {user,logout} = useAuth();
    return (
        <nav className="bg-blue-500 p-4 text-white flex justify-between">
            <h1 className="text-lg font-bold">PeerTrade</h1>
            <div>
                {user ? (
                    <>
                        <span className="mr-10">Welcome,{user.name}!</span>
                        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                    </>
                ):(
                    <>
                        <Link to="/login" className="mr-4">Login</Link> 
                        <Link to="/register">register</Link>
                    </>
                )}
            </div>
        </nav> 
    )
}

export default Navbar;