import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import App from "./App";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import CheckAuth from "./utils/CheckAuth";
import CheckGuest from "./utils/CheckGuest";

const token = Cookies.get("token");


export default createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <CheckAuth>
            <Home />
          </CheckAuth>,
        },
        {
          path: "/login",
          element: <CheckGuest>
                    <Login />
                    </CheckGuest>,
}, 
        {
          path: "/register",
          element: <CheckGuest>
                    <Register />
                    </CheckGuest>,
        },
      ],
    },
  ]);