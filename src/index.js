import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FilterProvider } from "./context/FilterContext";
import { CartContextProvider } from "./context/CartContext";
import { AppProvider } from "./context/ProductContext";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-hpydsfivj65hjf3t.us.auth0.com"
    clientId="KQHpzgAM3V5znK0rr5Zf6wxlLGqaNXdi"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <AppProvider>
      <FilterProvider>
        <CartContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </CartContextProvider>
      </FilterProvider>
    </AppProvider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
