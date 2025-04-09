import React,{useState}from "react";
import {useNavigate} from "react-router-dom";
import API from "../services/api";
import {useAuth} from "../context/AuthContext";

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
            setError("Registratin failed. Please try again.");
        } finally{
            setLoading(false);
        }
    }

    return(<div>
        <div className="flex justify-center items-center h-screen bg-blue-200">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                {error && <p className="text-red-500">{error}</p>}
                <label>Name</label>
                <input type="text" className="border mb-3 w-full" value={name} onChange={(e)=>setName(e.target.value)} />
                <label>Email</label>
                <input type="email" className="border mb-3 w-full" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" className="border mb-3 w-full" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit" disabled={loading} className="bg bg-green-500 text-white px-4 py-2 rounded hover:bg-green-200">
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    </div>)
}

export default Register;