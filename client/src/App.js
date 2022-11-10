import { NavBar } from "./features/ui";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./features/auth/authSlice.js";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";

function App() {
  const dispatch = useDispatch();
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
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
