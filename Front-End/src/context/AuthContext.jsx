import { createContext, useEffect, useState,useContext } from "react";

const AuthContext = createContext(); // used to store authentication information 


const AuthProvider = ({children}) => {
    // Holds the user state
    const [user,setUser] = useState(null);
    // Check local storage on page load, if token exists user stays login else not
    useEffect( () => {
        const token = localStorage.getItem("token");
        if(token){
            setUser({token});
        }
    },[]);

    // Stores token in local storage
    const login = (token) => {
        console.log("Login data recieved",token); //Debugging
        localStorage.setItem("token",JSON.stringify(token));
        setUser({token});
    }

    // Remove token from local storage
    const logout = (token) => {
        localStorage.removeItem("token");
        setUser(null);
    };
    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};
const useAuth = () => useContext(AuthContext);
export default AuthContext ;
export {AuthProvider,useAuth};