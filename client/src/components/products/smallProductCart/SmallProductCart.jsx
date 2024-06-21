import { Link } from "react-router-dom";
import "./SmallProductCart.css";
import { FaCartPlus } from "react-icons/fa";

import { useContext } from "react";
import { CartContext } from "../../../context/cart/CartProvider";
import { CART_ACTION } from "../../../context/cart/CartReducer";
import { toast } from "react-toastify";

const SmallProductCart = ({ food }) => {
  // console.log("food:", food);
  const { cartItems, dispatch } = useContext(CartContext);

  // Add to cart
  const addToCartHandler = async (food_id) => {
    const existingItem = cartItems.find((item) => item.food_id === food_id);

    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    if (existingItem) {
      toast.warning("Item exist in the cart!");
    } else {
      dispatch({
        type: CART_ACTION.ADD_ITEM_TO_CART,
        payload: { ...food, quantity },
      });

      toast.success("Item added to cart successfully!");
    }
  };

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
              <FaCartPlus onClick={() => addToCartHandler(food_id)} />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default SmallProductCart;
