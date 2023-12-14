import React from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useEffect } from "react";
import PageNavigation from "./PageNavigation";
import MyImages from "./MyImages";
import FormatPrice from "./FormatPrice";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import Rating from "./Rating";
import AddToCart from "./AddToCart";

const API = "https://api.pujakaitem.com/api/products";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();

  const { id } = useParams();

  const {
    name,
    company,
    price,
    description,
    category,
    stock,
    image,
    stars,
    reviews,
  } = singleProduct;

  console.log(price);
  useEffect(() => {
    getSingleProduct(`${API}?id=${id}`);
  }, []);

  if (isSingleLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading.....
      </div>
    );
  }
  return (
    <section className="single_product">
      <PageNavigation title={name} />
      <div className="container">
        <aside className="image_container">
          <MyImages image={image} />
        </aside>

        <aside className="product_data">
          <h2>{name}</h2>
          <div>
            <Rating stars={stars} reviews={reviews} />
          </div>
          <div className="mrp">
            MRP :
            <del>
              <FormatPrice price={price + 250000} />
            </del>
          </div>
          <span>
            Deal of the Day : <FormatPrice price={price} />
          </span>
          <p>{description}</p>
          <div className="warranty">
            <div>
              <TbTruckDelivery />
              <p>Free Delivery</p>
            </div>
            <div>
              <TbReplace />
              <p>30 Days Replacement</p>
            </div>
            <div>
              <MdOutlineSecurity />
              <p>2 Years Warranty</p>
            </div>
          </div>
          <div className="brand">
            <span>
              Avialable : <span>{stock > 0 ? "In Stock" : "Out Of Stock"}</span>
            </span>
            <span>
              Category : <span>{category}</span>
            </span>
            <span>
              Brand : <span>{company}</span>
            </span>
            <hr />
            {stock > 0 && <AddToCart product={singleProduct} />}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default SingleProduct;
