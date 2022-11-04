import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./features/auth/authSlice.js"
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookie.get("token");
  async function fetchUser() {
    //verify token+user

    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // //user is authorized
    if (res.ok) {
      const user = await res.json();
      dispatch(setUser(user));
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
