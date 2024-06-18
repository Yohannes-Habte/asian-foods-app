import { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/cart/CartProvider";
import { CART_ACTION } from "../../../context/cart/CartReducer";
import { toast } from "react-toastify";

const SearchResultCart = ({ car }) => {
  const { cartItems, dispatch } = useContext(CartContext);
  const {
    fields: { brand, description, model, price, year, image },
    sys: { id },
  } = car;

  // Add to cart
  const addToCartHandler = async (id) => {
    const existingItem = cartItems.find((item) => item.sys.id === id);

    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    if (existingItem) {
      toast.warning("Item exist in the cart!");
    } else {
      dispatch({
        type: CART_ACTION.ADD_ITEM_TO_CART,
        payload: { ...car, quantity },
      });

      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <section key={id} className="cart-product-container">
      <Link to={`/products/${id}`}>
        <figure>
          <img className="car-image" src={image.fields.file.url} alt={brand} />
        </figure>
        <h3 className="header-smallCard"> {brand} </h3>
        <p className="sub-title-text"> {model} </p>
        <p> Year: {year.slice(0, 4)} </p>
        <p>
          {description.content[0].content[0].value.slice(0, 139).concat("...")}
          <span className="text-red-500">read more</span>{" "}
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

export default SearchResultCart;
