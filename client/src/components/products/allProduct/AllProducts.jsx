import { useEffect, useState } from "react";
import "./AllProducts.css";
// import GlobalFunction from "../../../utils/GlobalFunction";
// import PageLoader from "../../loader/PageLoader";
import SmallProductCart from "../smallProductCart/SmallProductCart";
// import axios from "axios";
import { Foods } from "../../../../../Data/Foods";
import axios from "axios";

const AllProducts = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  // const { loading, data, getProducts } = GlobalFunction();

  const getAllFoods = async () => {
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
    getAllFoods();

    return () => {};
  }, []);

  return (
    <>
      <div className="small-product-cart-wrapper">
        {foods &&
          foods.length !== 0 &&
          foods.map((food) => (
            <SmallProductCart key={food.food_id} food={food} />
          ))}
      </div>
    </>
  );
};

export default AllProducts;
