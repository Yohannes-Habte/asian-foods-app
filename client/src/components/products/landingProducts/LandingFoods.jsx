import "./LandingPageProducts.css";
import SmallProductCart from "../smallProductCart/SmallProductCart";
import GlobalFunction from "../../../utils/GlobalFunction";
import { URL } from "../../../utils/myLocalURL";
import { Link } from "react-router-dom";

const LandingFoods = () => {
  const { data } = GlobalFunction(`${URL}/foods`);
  return (
    <section>
      {" "}
      <div className="flex justify-between mb-3 mt-20">
        <h4 className="new-car-text text-white">Weekly Offers</h4>
        <h4 className="show-more-text">
          {" "}
          <Link to={"/products"}>Show more</Link>{" "}
        </h4>
      </div>{" "}
      <div className="small-product-cart-wrapper">
        {data &&
          data.foods &&
          data.foods.map((food) => (
            <SmallProductCart key={food.food_id} food={food} />
          ))}
      </div>
    </section>
  );
};

export default LandingFoods;
