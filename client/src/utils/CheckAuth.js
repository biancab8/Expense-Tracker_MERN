
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function CheckAuth({children}){
    // props.children gives whatever is between the <CheckAuth> opening and </CheckAuth> closing tag. I.e. for:
    // <CheckAuth><Home/></CheckAuth>
    // it would give <Home />

    const auth = useSelector((state) => state.authReducer);
    console.log("check auth: is logged in? " + auth.isAuthenticated)

    return auth.isAuthenticated?children:<Navigate to="/login" />;

}