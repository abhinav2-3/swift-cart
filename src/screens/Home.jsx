import React from "react";
import Companies from "../compoenents/Companies";
import FeaturedProducts from "../compoenents/FeaturedProducts";
import Herosection from "../compoenents/Herosection";
import Services from "../compoenents/Services";

const Home = () => {
  const data = {
    name: "SwiftCart",
  };

  return (
    <section className="home">
      <Herosection myData={data} />
      <FeaturedProducts />
      <Services />
      <Companies />
    </section>
  );
};

export default Home;
