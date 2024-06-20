import "./LandingPageProducts.css";
import SmallProductCart from "../smallProductCart/SmallProductCart";
import { useState, useEffect } from "react";
import axios from "axios";

const LandingFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:9000/api/v1/foods`);
      setFoods(data.foods);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
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
          foods.map((food) => (
            <SmallProductCart key={food.food_id} food={food} />
          ))}
      </div>
    </section>
  );
};

export default LandingFoods;
