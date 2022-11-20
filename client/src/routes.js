import { createBrowserRouter } from "react-router-dom";
import { Home, Register, Login, Categories } from "./pages";
import App from "./App";
import { CheckAuth, CheckGuest } from "./features/auth";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <CheckGuest>
            <Login />
          </CheckGuest>
        ),
      },
      {
        path: "/register",
        element: (
          <CheckGuest>
            <Register />
          </CheckGuest>
        ),
      },
      {
        path: "/categories",
        element: (
          <CheckAuth>
            <Categories />
          </CheckAuth>
        ),
      },
    ],
  },
]);
