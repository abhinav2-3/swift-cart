import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle";
import { useCartContext } from "../context/CartContext";

const AddToCart = ({ product }) => {
  const id = product.id;

  const colorsArray = product && product.colors ? product.colors : [];
  const initialColor = product.colors ? product.colors[0] : null;

  const [color, setColor] = useState(initialColor);
  const [amount, setAmount] = useState(1);

  const decrement = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const increment = () => {
    amount < product.stock ? setAmount(amount + 1) : setAmount(product.stock);
  };

  const { addToCart } = useCartContext();

  return (
    <>
      <div className="colors_container">
        {colorsArray.map((currColor, index) => (
          <button
            key={index}
            className={
              color === currColor ? "buttonStyle active" : "buttonStyle"
            }
            style={{ backgroundColor: currColor }}
            onClick={() => setColor(currColor)}
          >
            {color === currColor ? <FaCheck /> : null}
          </button>
        ))}
      </div>
      <CartAmountToggle
        amount={amount}
        increment={increment}
        decrement={decrement}
      />
      <button
        className="btn"
        onClick={() => addToCart(color, id, amount, product)}
      >
        Add To Cart
      </button>
    </>
  );
};

AddToCart.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default AddToCart;
