import { Link } from "react-router-dom";
import "./SmallProductCart.css";

import { FaCartPlus } from "react-icons/fa";

const SmallProductCart = ({ food }) => {
  console.log("food:", food);

  const {
    food_id,
    food_name,
    description,
    food_price,
    country,
    spicelevel,
    image,
  } = food;

  return (
    <>
      <section className="cart-product-container flex flex-col justify-between">
        <div>
          <Link to={`/products/${food_id}`}>
            <figure>
              <img className="car-image" src={image} alt={food_name} />
            </figure>
            <h3 className="header-smallCard"> {food_name} </h3>
            <p className="sub-title-text uppercase"> {country} </p>
            <p> Spicy level: {spicelevel} </p>
            <p className="line-clamp-4">
              {" "}
              {description} <span className="text-red-500">read more</span>{" "}
            </p>
          </Link>
        </div>
        <div className="flex justify-between mt-6" key={food_id}>
          <p className="bg-gray-200 py-1 px-2 rounded">
            {" "}
            Price: ${food_price}{" "}
          </p>
          <Link>
            <div className="p-2 bg-cyan-200">
              <FaCartPlus />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default SmallProductCart;
