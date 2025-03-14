import React,{useState} from "react";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log({email,password});
    }
    return(
        <div className="flex justify-center items-center h-screen bg-amber-200">
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input className="border-gray-600 bg-white" type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input className="border-gray-600 bg-white" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="border-gray-600 rounded-b-md" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;