import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";


export default function CheckAuth({children}){
    // props.children gives whatever is between the <CheckAuth> opening and </CheckAuth> closing tag. I.e. for:
    // <CheckAuth><Home/></CheckAuth>
    // it would give <Home />
    const token = Cookies.get("token");
    return token?children:<Navigate to="/login" replace={true} />
}