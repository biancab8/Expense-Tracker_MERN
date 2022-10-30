import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./features/auth/authSlice";
import { useEffect } from "react";

function App() {
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser("asdf"));
  }, []);

  console.log(auth);

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
