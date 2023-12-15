import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle";
import { useCartContext } from "../context/CartContext";

const AddToCart = ({ product }) => {
  const { id, colors, stock } = product;

  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const decrement = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const increment = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  const { addToCart } = useCartContext();

  return (
    <>
      <div className="colors_container">
        {colors.map((currColor, index) => (
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

export default AddToCart;
