import "./LandingPageProducts.css";
import { Foods } from "../../../../../Data/Foods";
import SmallProductCart from "../smallProductCart/SmallProductCart";
import { useState, useEffect } from "react";

const LandingFoods = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    setFoods(Foods);
  }, []);
  return (
    <section>
      {" "}
      <div className="flex justify-between mb-3 mt-20">
        <h4 className="new-car-text text-white">Weekly Offers</h4>
        <h4 className="show-more-text">Show more</h4>
      </div>{" "}
      <div className="small-product-cart-wrapper">
        {foods &&
          foods.map((food) => <SmallProductCart key={food.id} food={food} />)}
      </div>
    </section>
  );
};

export default LandingFoods;
