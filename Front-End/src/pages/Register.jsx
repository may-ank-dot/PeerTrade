import React,{useState}from "react";
import {useNavigate} from "react-router-dom";
import API from "../services/api";
import {useAuth} from "../context/AuthContext";
import SplitText from "../components/inComp/SplitText";
const Register = () => {
    const [email,setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading ,setLoading] = useState(false);
    const [error , setError] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth(); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        
        try{
            const response = await API.post("/users/register",{name,email,password})
            console.log("Registration success",response.data);
            login(response.data.user);
            navigate("/listings");
        } catch (error){
            console.error("Registration error",error);
            setError("Registration failed. Please try again.");
        } finally{
            setLoading(false);
        }
    }

    return(<div>
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="flex flex-col px-20 py-10 shadow-md shadow-gray-500 rounded-md">
                <h2 className="flex justify-center text-white text-6xl px-32 py-6 font-bold mb-4">
                   <SplitText text="Register"/> 
                </h2>
                {error && <p className="text-red-500">{error}</p>}

                <label className="mb-1 text-xl text-white font-bold">Name</label>
                <input type="text" className="text-white border border-gray-600 px-3 py-2 rounded-2xl mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
                    value={name} 
                    onChange={(e)=>setName(e.target.value)} 
                 />

                <label className="mb-1 text-xl text-white font-bold">Email</label>
                <input type="email" className="text-white border border-gray-600 px-3 py-2 rounded-2xl mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent" 
                   value={email} 
                   onChange={(e)=>setEmail(e.target.value)} 
                />

                <label className="mb-1 text-xl text-white font-bold">Password</label>
                <input type="password" className="text-white border border-gray-600 px-3 py-2 rounded-2xl mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} 
                />

                <button type="submit" disabled={loading} className="bg bg-green-500 text-white px-4 py-2 rounded hover:bg-green-200">
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    </div>)
}

export default Register;