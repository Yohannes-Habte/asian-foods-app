import "./FeaturedProducts.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../../../context/cart/CartProvider";
import { CART_ACTION } from "../../../context/cart/CartReducer";
import { URL } from "../../../utils/myLocalURL";

const FeaturedProductsDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${URL}/foods/${id}`);
        setData(data.food);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };

    fetchData();
  }, []);

  const { cartItems, dispatch } = useContext(CartContext);

  // Add to cart

  const addToCartHandler = async (id) => {
    const existingItem = cartItems.find((item) => item.food_id === id);

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
      <section className="singleCar-details-container">
        <figure>
          <img
            className="single-page-car-image"
            src={data?.image}
            alt={data?.food_name}
          />
        </figure>
        <div className="bg-cyan-100 px-4">
          <div className=" flex items-center justify-between mt-6 bg-cyan-200 px-1 py-2 rounded">
            <div>
              <h3 className="header-singleproduct-detail">
                {" "}
                {data?.food_name}{" "}
              </h3>
            </div>
            <div className="flex gap-2">
              <div>
                <p className="bg-orange-200 py-2 px-2 rounded font-bold">
                  {" "}
                  Price: ${data?.food_price}{" "}
                </p>
              </div>
              <div
                className="flex  items-center gap-1 rounded bg-cyan-400 px-2"
                onClick={() => addToCartHandler(id)}
              >
                <button className="text-sm"> Add To Cart </button>
                <FaCartPlus />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mt-6 px-2">Description</h3>
            <p className="my-2 px-2">{data?.description}</p>
          </div>
          <h3 className="font-semibold mt-6 px-2">Specificattion:</h3>
          <section className=" px-1 py-2 rounded grid gap-2 grid-cols-2 mb-60">
            <div>
              <p className="bg-cyan-50 py-2 px-1 mb-1">
                Name: {data?.food_name}
              </p>
              <p className="bg-cyan-50 py-2 px-1">Countrs: {data?.country}</p>
            </div>
            <div>
              <p className="bg-cyan-50 py-2 px-1 mb-1">
                Price: ${data?.food_price}
              </p>
              <p className="bg-cyan-50 py-2 px-1"> Spicy: {data?.spicelevel}</p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default FeaturedProductsDetails;
