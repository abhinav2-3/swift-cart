import React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalData = () => {
  let localCartData = localStorage.getItem("switcart");
  if (!localCartData || localCartData === "[]") {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
  cart: getLocalData(),
  total_items: "",
  shipping_fee: 50000,
  total_price: "",
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //   ADD TO CART
  const addToCart = (color, id, amount, product) => {
    return dispatch({
      type: "ADD_TO_CART",
      payload: { color, id, amount, product },
    });
  };

  //   REMOVE FROM CART
  const removeProduct = (id) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: id });
  };

  //   INCREMENT & DECREMENT FROM CART
  const increment = (id) => {
    return dispatch({ type: "SET_INCREMENT", payload: id });
  };
  const decrement = (id) => {
    return dispatch({ type: "SET_DECREMENT", payload: id });
  };

  //   TO GET & CALCULATE TOTAL PRICE IN CART
  useEffect(() => {
    dispatch({ type: "CART_TOTAL_PRICE" });
    localStorage.setItem("swiftcart", JSON.stringify(state.cart));
  }, [state.cart]);

  // CLEAR CART DATA
  const clearCart = () => {
    return dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeProduct,
        clearCart,
        increment,
        decrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContextProvider, useCartContext };
