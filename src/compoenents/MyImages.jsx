import React, { useState } from "react";

const MyImages = ({ image = [{ url: "" }] }) => {
  const [mainImage, setMainImage] = useState(image[0]);
  return (
    <section className="myImages">
      <div>
        {image.map((item, idx) => {
          return (
            <figure key={idx}>
              <img
                src={item.url}
                alt={item.filename}
                key={idx}
                onClick={() => setMainImage(item)}
              />
            </figure>
          );
        })}
      </div>
      <aside>
        <img src={mainImage.url} alt={mainImage.filename} />
      </aside>
    </section>
  );
};

export default MyImages;
