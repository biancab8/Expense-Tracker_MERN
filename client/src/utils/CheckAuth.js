import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";


export default function CheckAuth({children}){
    const [verified, setVerified] = useState(true);
    let navigate=useNavigate();
    // props.children gives whatever is between the <CheckAuth> opening and </CheckAuth> closing tag. I.e. for:
    // <CheckAuth><Home/></CheckAuth>
    // it would give <Home />
    const token = Cookies.get("token"); 
    //send token to back-end to validate
    // let verified; 
    async function fetchUser(){

        const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        //user could not be authorized
        if (!res.ok){
            // console.log("cannot verify user")
            // verified=false;
            setVerified(false);
            navigate("/login");
        } else{
            // verified=true;
        }
        // console.log("user verified")
    }

    //only once
    useEffect(() => {fetchUser()}, []);

    return verified?children:<Navigate to="/login" replace={true} />;
    // return children;
}
//  return !token?children: