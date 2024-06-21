import { Link } from "react-router-dom";
import "./SmallProductCart.css";
import { useContext } from "react";
import { CartContext } from "../../../context/cart/CartProvider";
import { CART_ACTION } from "../../../context/cart/CartReducer";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";

const NewCarCart = ({ food }) => {
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
        payload: { ...food, quantity },
      });

      toast.success("Item added to cart successfully!");
    }
  };

  const {
    fields: { brand, description, model, price, year, image },
    sys: { id },
  } = car;

  const carDescription = description.content[0].content[0].value;
  const shortDescription = carDescription.slice(0, 139);
  const shortText = shortDescription.concat("...");

  return (
    <section className="cart-product-container">
      <Link to={`/products/${id}`}>
        <figure>
          <img className="car-image" src={image.fields.file.url} alt={brand} />
        </figure>
        <h3 className="header-smallCard"> {brand} </h3>
        <p className="sub-title-text"> {model} </p>
        <p> Year: {year.slice(0, 4)} </p>
        <p>
          {" "}
          {shortText} <span className="text-red-500">read more</span>{" "}
        </p>
      </Link>
      <div className="flex justify-between mt-6">
        <p className="bg-gray-200 py-1 px-2 rounded"> Price: ${price} </p>
        <Link>
          <div className="card-icon">
            <FaCartPlus onClick={() => addToCartHandler(id)} />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default NewCarCart;
