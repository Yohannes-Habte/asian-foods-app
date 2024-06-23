import "./AllProducts.css";
import SmallProductCart from "../smallProductCart/SmallProductCart";
import GlobalFunction from "../../../utils/GlobalFunction";
import { URL } from "../../../utils/myLocalURL";
const AllProducts = () => {
  const { data } = GlobalFunction(`${URL}/foods`);

  return (
    <>
      <div className="small-product-cart-wrapper">
        {data &&
          data.foods &&
          data.foods.length !== 0 &&
          data.foods.map((food) => (
            <SmallProductCart key={food.food_id} food={food} />
          ))}
      </div>
    </>
  );
};

export default AllProducts;
