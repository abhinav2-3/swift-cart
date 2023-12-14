import React from "react";
import { useFilterContext } from "../context/FilterContext";
import Product from "./Product";

const ProductList = () => {
  const { filter_Products } = useFilterContext();
  return (
    <div className="productList">
      {filter_Products.map((item, index) => {
        return <Product key={index} {...item} />;
      })}
    </div>
  );
};

export default ProductList;
