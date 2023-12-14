import React from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";

const Header = () => {
  const { cart } = useCartContext();
  return (
    <nav>
      <h1>
        <NavLink to={"/"}>Abhi.store</NavLink>
      </h1>

      <div>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/products"}>Products</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
        <NavLink to={"/cart"}>
          <FaShoppingCart />
          {cart.length > 0 ? <span className="badge">{cart.length}</span> : ""}
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
