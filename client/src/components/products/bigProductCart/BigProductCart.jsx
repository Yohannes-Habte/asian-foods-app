/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import "./BigProductCart.css";
import { FaCartPlus } from "react-icons/fa";
import { CartContext } from "../../../context/cart/CartProvider";
import { useContext } from "react";
import { CART_ACTION } from "../../../context/cart/CartReducer";
import { toast } from "react-toastify";

const BigProductCart = ({ food }) => {
  const { food_id, food_name, description, food_price, image, spicelevel } =
    food;

  const { cartItems, dispatch } = useContext(CartContext);

  // Add to cart
  const addToCartHandler = async (id) => {
    const existingItem = cartItems.find((item) => item.sys.id === id);

    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    if (existingItem) {
      toast.warning("Item exist in the cart!");
    } else {
      dispatch({
        type: CART_ACTION.ADD_ITEM_TO_CART,
        payload: { ...data, quantity },
      });

      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <>
      <section className="bigCard-container">
        <div className="flex flex-col p-4 justify-between">
          <div className="card-content">
            <header className="header-bigCard"> {food_name}</header>
            <h3 className="font-semibold mb-2">Spicy level: {spicelevel}</h3>
            <p className="card-content-para line-clamp-3"> {description}</p>
          </div>

          <div className="bigCard-content-bottom flex items-center justify-between mt-6">
            <div className="btn-bigCard">
              <Link to={`products/featured/${food_id}`}>
                <button>Details</button>
              </Link>
            </div>
            <div className="bottom-right">
              <div className="bg-gray-800 py-1 px-4 rounded text-white">
                <p>${food_price}</p>
              </div>
              <div className="py-2 px-4 bg-cyan-400 hover:bg-cyan-800 hover:text-white cursor-pointer rounded">
                <FaCartPlus />
              </div>
            </div>
          </div>
        </div>
        <img src={image} alt={name} className="photo-card-big" />
      </section>
    </>
  );
};

export default BigProductCart;
