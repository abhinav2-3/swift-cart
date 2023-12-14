import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "./FormatPrice";

const Product = (item) => {
  const { id, name, image, price, category } = item;
  return (
    <NavLink className="navProduct" to={`/singleProduct/${id}`}>
      <figure>
        <img src={image} alt={name} />
        <figcaption>{category}</figcaption>
      </figure>
      <div>
        <h3>{name}</h3>
        <p>
          <FormatPrice price={price} />
        </p>
      </div>
    </NavLink>
  );
};

export default Product;
