import { NavBar } from "./features/ui";
import { Outlet } from "react-router-dom";
import Cookie from "js-cookie";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
