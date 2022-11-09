import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function CheckGuest({children}){
    
    const auth = useSelector((state) => state.authReducer);

    return !auth.isAuthenticated?children:<Navigate to="/" replace={true} />
}