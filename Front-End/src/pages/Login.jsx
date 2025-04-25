import React,{useState} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import SplitText from "../components/inComp/SplitText";
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
           navigate("/");
        }catch(err){
            setError("Invalid email or password. Please try again.");
            console.error("Login Error",err);
        }finally{
            setLoading(false);
        }
    }
    
    return(
        <div className="flex bg-gray-900  justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col px-20 py-10 shadow-md shadow-gray-500 rounded-md">
                <h2 className="flex justify-center px-32 py-8 text-white text-6xl font-bold mb-4 ">
                    <SplitText text="Login" />    
                </h2>
                {error && <p className="text-red-500">{error}</p>}

                <label className="mb-1 text-xl text-white font-bold">Email</label>
                <input className="border border-gray-600 px-3 py-2 rounded-2xl mb-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <label className="mb-1 text-xl text-white font-bold">Password</label>
                <input className="border border-gray-600 px-3 py-2 rounded-2xl mb-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent" 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="border border-gray-600 rounded-md bg-blue-500 text-white px-2 py-2 mt-2 hover:bg-blue-700" type="submit" disabled={loading}>
                    {loading ? "Loging in.." : "login"}
                </button>
            </form>
        </div>
    )
}

export default Login;