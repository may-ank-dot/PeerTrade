import React,{useState} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try{
           const response = await API.post('/users/login',{email,password});
           console.log("login Success"); 
           login(response.data);
           navigate("/listings");
        }catch(err){
            setError("Invalid email or password. Please try again.");
            console.error("Login Error",err);
        }finally{
            setLoading(false);
        }
    }
    
    return(
        <div className="flex justify-center items-center h-screen bg-amber-200">
            <form onSubmit={handleSubmit} className="flex flex-col bg-white px-20 py-8 shadow-md rounded-md">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <label className="mb-1">Email</label>
                <input className="border border-gray-600 rounded mb-3" type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label className="mb-1">Password</label>
                <input className="border border-gray-600 rounded mb-3" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="border border-gray-600 rounded-md bg-blue-500 text-white px-2 py-2 mt-2 hover:bg-red-500" type="submit" disabled={loading}>
                    {loading ? "Loging in.." : "login"}
                
                </button>
            </form>
        </div>
    )
}

export default Login;