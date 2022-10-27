import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


export default function CheckAuth({children}){
    // let navigate=useNavigate();
    const [verified, setVerified] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    // props.children gives whatever is between the <CheckAuth> opening and </CheckAuth> closing tag. I.e. for:
    // <CheckAuth><Home/></CheckAuth>
    // it would give <Home />
    const token = Cookies.get("token"); 
    //send token to back-end to validate
    // let verified; 
    async function fetchUser(){
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        setIsLoading(true);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        setIsLoading(false);
        //user could not be authorized
        if (!res.ok){
            // console.log("cannot verify user")
            // verified=false;
            setVerified(false);
            // navigate("/login");
        } else {
            setVerified(true)
        }
        // console.log("user verified")
    }

    //only once
    useEffect(() => {fetchUser()}, [])
    
    if(isLoading){
        return <p>Loading...</p>
    }
    return verified?children:<Navigate to="/login" replace={true} />;
    // return children;
}
//  return !token?children: