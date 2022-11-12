import { NavBar, Loading } from "./features/ui";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./features/auth/authSlice.js";
import { useEffect, useState } from "react";
import { userAPI } from "./api";
import Cookie from "js-cookie";
const token=Cookie.get("token")

function App() {
  // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUser() {
    const res = await userAPI.fetchUser();
    // //user is authorized
    if (res.ok) {
      // const user = await res.json();
      // dispatch(setUser(user));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
