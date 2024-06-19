import "./FeaturedProducts.css";
import { useContext, useEffect, useState } from "react";
import { clientProducts } from "../../../utils/clientProducts";
import { useParams } from "react-router-dom";
import PageLoader from "../../loader/PageLoader";
import { FaCartPlus } from "react-icons/fa";
import { CartContext } from "../../../context/cart/CartProvider";
import { toast } from "react-toastify";
import { CART_ACTION } from "../../../context/cart/CartReducer";

const FeaturedProductsDetails = () => {
  const { id } = useParams();

  const [featuredCarInfo, setFeaturedCarInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const status =
    featuredCarInfo?.fields?.newCar === true ? "New Car" : "Used Car";

  const featuredCarDetails = async () => {
    try {
      setLoading(true);
      const data = await clientProducts.getEntry(id);
      setFeaturedCarInfo(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    featuredCarDetails();

    return () => {};
  }, []);

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
        payload: { ...featuredCarInfo, quantity },
      });

      toast.success("Item added to cart successfully!");
    }
  };

  return loading ? (
    <PageLoader />
  ) : (
    <section className="mb-10 fituredCar-details-container">
      <figure>
        <img
          className="single-page-car-image"
          src={featuredCarInfo?.fields?.image?.fields?.file?.url}
          alt={featuredCarInfo?.fields?.brand}
        />
      </figure>

      <div className="header-container flex items-center justify-between mt-6 bg-orange-200 px-1 py-2 rounded">
        <div>
          <h3 className="header-singleproduct-detail">
            {" "}
            {featuredCarInfo?.fields?.brand}{" "}
          </h3>
        </div>
        <div className="flex gap-2">
          <div>
            <p className="bg-orange-200 py-2 px-2 rounded font-bold">
              {" "}
              Price: ${featuredCarInfo?.fields?.price}{" "}
            </p>
          </div>
          <div className="card-icon flex  items-center gap-1 rounded">
            <button onClick={() => addToCartHandler(id)} className="text-sm">
              {" "}
              Add To Cart{" "}
            </button>
            <FaCartPlus onClick={() => addToCartHandler(id)} />
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mt-6 px-2">Description</h3>
        <p className="my-2 px-2">
          {featuredCarInfo?.fields?.description?.content[0]?.content[0]?.value}
        </p>
      </div>
      <h3 className="font-semibold mt-6 px-2">Specificattion:</h3>

      <section className="bg-orange-200 px-1 py-2 rounded grid gap-2 grid-cols-2 mb-60">
        <div>
          <p className="bg-orange-200 py-2 px-1">
            {" "}
            Model: {featuredCarInfo?.fields?.model}{" "}
          </p>
          <p className="bg-orange-300 py-2 px-1">
            {" "}
            Brand: {featuredCarInfo?.fields?.brand}{" "}
          </p>
          <p className="bg-orange-200 py-2 px-1">
            {" "}
            Category: {featuredCarInfo?.fields?.catagory}{" "}
          </p>
          <p className="bg-orange-300 py-2 px-1">
            {" "}
            color: {featuredCarInfo?.fields?.colour}{" "}
          </p>
        </div>
        <div>
          <p className="bg-orange-200 py-2 px-1"> Status: {status}</p>
          <p className="bg-orange-300 py-2 px-1">
            {" "}
            Performance: {featuredCarInfo?.fields?.performance}{" "}
          </p>
          <p className="bg-orange-200 py-2 px-1">
            {" "}
            Transmission: {featuredCarInfo?.fields?.transmission}{" "}
          </p>
          <p className="bg-orange-300 py-2 px-1">
            {" "}
            Year: {featuredCarInfo?.fields?.year}{" "}
          </p>
        </div>
      </section>
    </section>
  );
};

export default FeaturedProductsDetails;
