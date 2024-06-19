import { useEffect, useState } from "react";
import "./AllProducts.css";
// import GlobalFunction from "../../../utils/GlobalFunction";
// import PageLoader from "../../loader/PageLoader";
import SmallProductCart from "../smallProductCart/SmallProductCart";
// import axios from "axios";
import { Foods } from "../../../../../Data/Foods";

const AllProducts = () => {
  const [foods, setFoods] = useState([]);
  // const { loading, data, getProducts } = GlobalFunction();

  const getAllFoods = async () => {
    try {
      setFoods(Foods);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("all cars data =", data);
  // console.log(Foods);

  // Display data on browser
  useEffect(() => {
    getAllFoods();
    console.log(foods);

    // getProducts("cars", 12, 0);

    return () => {};
  }, []);

  return (
    <>
      <div className="small-product-cart-wrapper">
        {foods &&
          foods.length !== 0 &&
          foods.map((food) => <SmallProductCart key={food.id} food={food} />)}
      </div>

      <section>
        {/* <h3>List of Products</h3>
        {loading ? (
          <div className="small-product-cart-page-loader">
            <PageLoader />
          </div>
        ) : (
          <div className="small-product-cart-wrapper">
            {foods &&
              foods.length !== 0 &&
              foods.map((food) => (
                <SmallProductCart key={food.id} food={food} />
              ))}
          </div>
        )} */}
      </section>
    </>
  );
};

export default AllProducts;
