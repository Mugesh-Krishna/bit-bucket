/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { AuthContextProvider } from "context";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { store } from "Store/Store";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
import { Provider } from "react-redux";

root.render(
  <BrowserRouter>
  <Provider store={store}>

 
    <AuthContextProvider>
      <MaterialUIControllerProvider>
    
        <App />
      </MaterialUIControllerProvider>
    </AuthContextProvider>
     </Provider>
  </BrowserRouter>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

