import React from "react";
import { NavLink } from "react-router-dom";
import CartAmountToggle from "../compoenents/CartAmountToggle";
import { useCartContext } from "../context/CartContext";
import FormatPrice from "../compoenents/FormatPrice";
import { MdDelete } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";

const Cart = () => {
  const { isAuthenticated, user } = useAuth0();
  const {
    cart,
    removeProduct,
    clearCart,
    decrement,
    increment,
    total_price,
    shipping_fee,
  } = useCartContext();

  if (cart.length > 0) {
    return (
      <section className="cart">
        {isAuthenticated && (
          <div className="user-detail">
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
          </div>
        )}
        <div className="table">
          <p>Item</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>SubTotal</p>
          <p>Remove</p>
        </div>
        <hr />
        <section>
          {cart.map((currElem, index) => {
            return (
              <div key={index}>
                <div className="prod_data">
                  <img src={currElem.image} alt={currElem.name} />
                  <aside>
                    <span>{currElem.name}</span>
                    <div>
                      Color :<p style={{ backgroundColor: currElem.color }}></p>
                    </div>
                  </aside>
                </div>
                <p className="price">
                  <FormatPrice price={currElem.price} />
                </p>
                <div className="cartToggle">
                  <CartAmountToggle
                    amount={currElem.amount}
                    increment={() => increment(currElem.id)}
                    decrement={() => decrement(currElem.id)}
                  />
                </div>
                <p className="price">
                  <FormatPrice price={currElem.price * currElem.amount} />
                </p>
                <p className="button">
                  <MdDelete onClick={() => removeProduct(currElem.id)} />
                </p>
              </div>
            );
          })}
          <hr />
          <div className="two-btns">
            <NavLink to={"/products"}>
              <button className="btn">Continue Shopping</button>
            </NavLink>
            <button className="btn" onClick={clearCart}>
              Clear Filter
            </button>
          </div>
          <div className="total">
            <p>
              SubTotal :
              <span>
                <FormatPrice price={total_price} />
              </span>
            </p>
            <p>
              Shipping Charge :{" "}
              <span>
                <FormatPrice price={shipping_fee} />
              </span>
            </p>
            <hr />
            <p>
              Total :{" "}
              <span>
                <FormatPrice price={shipping_fee + total_price} />
              </span>
            </p>
          </div>
        </section>
      </section>
    );
  } else {
    return (
      <div className="noData">
        <h3>Cart is Empty!!</h3>
      </div>
    );
  }
};

export default Cart;
