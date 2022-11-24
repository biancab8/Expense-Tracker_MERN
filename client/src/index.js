import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.js";
import { Provider } from "react-redux";
import {persistor, store} from "./store";
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  {/* persist user reducer to browser's local storage -> not deleted on refresh */}
  <PersistGate loading={null} persistor={persistor}> 
      <RouterProvider router={router} />
  </PersistGate>
    </Provider>
);

