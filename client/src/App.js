import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./features/auth/authSlice";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");
  async function fetchUser() {
    //verify token+user

    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // //user could not be authorized
    if (res.ok) {
      const user = await res.json();
      console.log("App: gonna dispatch and login now ")
      dispatch(getUser(user));
    }
    setIsLoading(false);
    // else {
    //     navigate("/login");
    // }
  }
  // console.log(useSelector((state) => state.authReducer))

  useEffect(() => {
    fetchUser();

  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
