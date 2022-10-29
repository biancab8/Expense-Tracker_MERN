import Cookies from "js-cookie";
import { useEffect, useState, useCallback } from "react";
import { Navigate, useNavigate} from "react-router-dom";


export default function CheckAuth({children}){
    let navigate=useNavigate();
    const [verified, setVerified] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    // props.children gives whatever is between the <CheckAuth> opening and </CheckAuth> closing tag. I.e. for:
    // <CheckAuth><Home/></CheckAuth>
    // it would give <Home />
    const token = Cookies.get("token"); 
    //send token to back-end to validate
    async function fetchUser(){
        setIsLoading(true);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    
        setIsLoading(false);
        // //user could not be authorized
        if (!res.ok){
            navigate("/login");
        } 
        setVerified(true);
    }
    //only once
    useEffect(() => {
        fetchUser()
        // .catch((err) => {console.log(err);})
    }, []); 
    
    if(isLoading){
        return <p>Loading...</p>
    }

    if(verified){
        return children;
    }

}