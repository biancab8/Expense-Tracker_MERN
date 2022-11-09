import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function CheckAuth({children}){
    // props.children gives whatever is between the <CheckAuth> opening and </CheckAuth> closing tag. I.e. for:
    // <CheckAuth><Home/></CheckAuth>
    // it would give <Home />

    const auth = useSelector((state) => state.authReducer);

    return auth.isAuthenticated?children:<Navigate to="/login" />;

}