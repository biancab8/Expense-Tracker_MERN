import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function CheckGuest({children}){
    //check store if user is authenticated. No -> return children, else nav to home
    
    const auth = useSelector((state) => state.authReducer);
    return !auth.isAuthenticated?children:<Navigate to="/" replace={true} />
}