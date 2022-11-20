import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function CheckAuth({ children }) {
  //check store if user is authenticated. Yes -> return children, else nav to login
  const auth = useSelector((state) => state.authReducer);
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
}

// props.children gives whatever is between the <CheckAuth> opening and </CheckAuth> closing tag. I.e. for:       CheckAuth><Home/></CheckAuth>    it would give <Home />
