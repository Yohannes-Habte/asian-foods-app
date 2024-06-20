/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import "./BigProductCart.css";
import { FaCartPlus } from "react-icons/fa";
import { CartContext } from "../../../context/cart/CartProvider";
import { useContext } from "react";
import { CART_ACTION } from "../../../context/cart/CartReducer";
import { toast } from "react-toastify";
// import { SpecialFoods } from "../../../../../Data/SpecialFoods";
// import { useState, useEffect } from "react";

const BigProductCart = ({ food }) => {
  // const [specialFoods, setSpecialFoods] = useState([]);
  // const getAllSpecialFoods = async () => {
  //   try {
  //     setSpecialFoods(SpecialFoods);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // useEffect(() => {
  //   getAllSpecialFoods();
  //   console.log(specialFoods);
  // }, []);

  const { id, name, description, price, image, spicy } = food;

  // const {
  //   fields: { brand, catagory, description, model, newCar, price, image },
  //   sys: { id },
  // } = data;

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

  // const carDescription = description.content[0].content[0].value;
  // const shortDescription = carDescription.slice(0, 200);
  // const shortText = shortDescription.concat("...");

  return (
    <>
      <section className="bigCard-container">
        <div className="flex flex-col p-4 justify-between">
          <div className="card-content">
            <header className="header-bigCard"> {name}</header>
            <h3 className="font-semibold mb-2">Spicy level: {spicy}</h3>
            <p className="card-content-para line-clamp-3"> {description}</p>
          </div>

          <div className="bigCard-content-bottom flex items-center justify-between mt-6">
            <div className="btn-bigCard">
              <Link to={`products/featured/${id}`}>
                <button>Details</button>
              </Link>
            </div>
            <div className="bottom-right">
              <div className="bg-gray-800 py-1 px-4 rounded text-white">
                <p>${price}</p>
              </div>
              <div className="card-icon">
                <FaCartPlus />
              </div>
            </div>
          </div>
        </div>
        <img src={image} alt={name} className="photo-card-big" />
      </section>
      <section className="bigCard-container">
        {/* <div className="flex flex-col p-4 justify-between">
              <div className="card-content">
                <header className="header-bigCard">{brand}</header>
                <h3 className="font-semibold mb-2">{model}</h3>
                <p className="card-content-para line-clamp-3">{shortText}</p>
              </div>
              <div className="bigCard-content-bottom flex items-center justify-between mt-6">
                <div className="btn-bigCard">
                  <Link to={`products/featured/${id}`}>
                    <button>Details</button>
                  </Link>
                </div>
                <div className="bottom-right">
                  <div className="bg-gray-800 py-1 px-4 rounded text-white">
                    <p>${price}</p>
                  </div>
                  <div className="card-icon">
                    <FaCartPlus onClick={() => addToCartHandler(id)} />
                  </div>
                </div>
              </div>
            </div>
            <div>
          <img
            src={image.fields.file.url}
            alt={brand}
            className="photo-card-big"
          />
        </div> */}
      </section>
    </>
  );
};

export default BigProductCart;
