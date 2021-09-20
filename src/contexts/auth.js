import { useState, createContext, useEffect } from "react";
import firebase  from "firebase";

export const AuthContext = createContext({});

export default function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        function loadStorage(){
            const storageUser = localStorage.getItem('SistemaUser');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        localStorage();
    },[])

    return(
        <AuthContext.Provider value={{signed: !!user, user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}