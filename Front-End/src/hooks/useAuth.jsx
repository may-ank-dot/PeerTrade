import { useState,useEffect } from "react";
import API from "../services/api";

const useAuth = () =>{ 
    const [user,setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        const fetchUser= async()=>{
            try{
                const response = await API.get("/users/me");
                setUser(response.data.user);
            } catch(err){
                setUser(null);
            } finally{
                setLoading(false);
            }
        };
        fetchUser();
    },[] );
    return {user,loading};
};
export default useAuth;