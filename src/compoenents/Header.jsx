import React from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { cart } = useCartContext();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return (
    <nav>
      <h1>
        <NavLink to={"/"}>Swift Cart</NavLink>
      </h1>

      <div>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/products"}>Products</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
        {isAuthenticated && <h4>({user.name})</h4>}
        {isAuthenticated ? (
          <button
            className="btn"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        ) : (
          <button className="btn" onClick={() => loginWithRedirect()}>
            Log In
          </button>
        )}

        <NavLink to={"/cart"}>
          <FaShoppingCart />
          {cart.length > 0 ? <span className="badge">{cart.length}</span> : ""}
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
