import { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import PageLoader from "../../loader/PageLoader";
import { FaCartPlus } from "react-icons/fa";
// import { CartContext } from "../../../context/cart/CartProvider";
// import { CART_ACTION } from "../../../context/cart/CartReducer";
import { toast } from "react-toastify";
import { Foods } from "../../../../../Data/Foods.js";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  console.log("id:", id);
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);

  // Global variables
  // const { cartItems, dispatch } = useContext(CartContext);

  // Local variables
  // const [carInfo, setCarInfo] = useState(null);
  //

  // const status = carInfo?.fields?.newCar === true ? "New Car" : "Used Car";

  // Fetch single product
  const getSingleFood = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:9000/api/v1/foods/${id}`
      );
      setFood(data.food);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getSingleFood();
  }, []);
  console.log(food);

  // const singleCarDetails = async () => {
  //   try {
  //     setSingleFood(Foods[id - 1]);
  //     // setLoading(true);
  //     // const data = await clientProducts.getEntry(id);
  //     // setCarInfo(data);

  //     // setLoading(false);
  //   } catch (error) {
  //     console.log(error.message);
  //     // setLoading(false);
  //   }
  // };

  // Display data on browser
  // useEffect(() => {
  //   singleCarDetails();
  //   console.log(singleFood);

  //   return () => {};
  // }, []);

  // Add to cart
  // const addToCartHandler = async (id) => {
  //   const existingItem = cartItems.find((item) => item.sys.id === id);

  //   const quantity = existingItem ? existingItem.quantity + 1 : 1;

  //   if (existingItem) {
  //     toast.warning("Item exist in the cart!");
  //   } else {
  //     dispatch({
  //       type: CART_ACTION.ADD_ITEM_TO_CART,
  //       payload: { ...carInfo, quantity },
  //     });

  //     toast.success("Item added to cart successfully!");
  //   }
  // };

  return (
    <>
      <section className="singleCar-details-container">
        <figure>
          <img
            className="single-page-car-image"
            src={food?.image}
            alt={food?.name}
          />
        </figure>
        <div className="bg-cyan-100">
          <div className=" flex items-center justify-between mt-6 bg-cyan-200 px-1 py-2 rounded">
            <div>
              <h3 className="header-singleproduct-detail"> {food?.name} </h3>
            </div>
            <div className="flex gap-2">
              <div>
                <p className="bg-gray-200 py-2 px-2 rounded font-bold">
                  {" "}
                  Price: ${food?.price}{" "}
                </p>
              </div>
              <div className="flex  items-center gap-1 rounded bg-cyan-300 px-2">
                <button className="text-sm"> Add To Cart </button>
                <FaCartPlus />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mt-6 px-2">Description</h3>
            <p className="my-2 px-2">{food?.description}</p>
          </div>
          <h3 className="font-semibold mt-6 px-2">Specificattion:</h3>
          <section className=" px-1 py-2 rounded grid gap-2 grid-cols-2 mb-60">
            <div>
              <p className="bg-cyan-50 py-2 px-1 mb-1">Name: {food?.name}</p>
              <p className="bg-cyan-50 py-2 px-1">Countrs: {food?.country}</p>
            </div>
            <div>
              <p className="bg-cyan-50 py-2 px-1 mb-1">Price: ${food?.price}</p>
              <p className="bg-cyan-50 py-2 px-1"> Spicy: {food?.spicy}</p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
  // loading ? (
  //   <div>
  //     <PageLoader />
  //   </div>
  // ) : (
  //   <section className="singleCar-details-container">
  //     <figure>
  //       <img
  //         className="single-page-car-image"
  //         src={carInfo?.fields?.image?.fields?.file?.url}
  //         alt={carInfo?.fields?.brand}
  //       />
  //     </figure>
  //     <div className="header-container flex items-center justify-between mt-6 bg-orange-100 px-1 py-2 rounded">
  //       <div>
  //         <h3 className="header-singleproduct-detail">
  //           {" "}
  //           {carInfo?.fields?.brand}{" "}
  //         </h3>
  //       </div>
  //       <div className="flex gap-2">
  //         <div>
  //           <p className="bg-gray-200 py-2 px-2 rounded font-bold">
  //             {" "}
  //             Price: ${carInfo?.fields?.price}{" "}
  //           </p>
  //         </div>
  //         <div className="card-icon flex  items-center gap-1 rounded">
  //           <button onClick={() => addToCartHandler(id)} className="text-sm">
  //             {" "}
  //             Add To Cart{" "}
  //           </button>
  //           <FaCartPlus onClick={() => addToCartHandler(id)} />
  //         </div>
  //       </div>
  //     </div>
  //     <div>
  //       <h3 className="font-semibold mt-6 px-2">Description</h3>
  //       <p className="my-2 px-2">
  //         {carInfo?.fields?.description?.content[0]?.content[0]?.value}
  //       </p>
  //     </div>
  //     <h3 className="font-semibold mt-6 px-2">Specificattion:</h3>

  //     <section className="bg-gray-100 px-1 py-2 rounded grid gap-2 grid-cols-2 mb-60">
  //       <div>
  //         <p className="bg-gray-200 py-2 px-1">
  //           {" "}
  //           Model: {carInfo?.fields?.model}{" "}
  //         </p>
  //         <p className="bg-gray-300 py-2 px-1">
  //           {" "}
  //           Brand: {carInfo?.fields?.brand}{" "}
  //         </p>
  //         <p className="bg-gray-200 py-2 px-1">
  //           {" "}
  //           Category: {carInfo?.fields?.catagory}{" "}
  //         </p>
  //         <p className="bg-gray-300 py-2 px-1">
  //           {" "}
  //           color: {carInfo?.fields?.colour}{" "}
  //         </p>
  //       </div>
  //       <div>
  //         <p className="bg-gray-200 py-2 px-1"> Status: {status}</p>
  //         <p className="bg-gray-300 py-2 px-1">
  //           {" "}
  //           Performance: {carInfo?.fields?.performance}{" "}
  //         </p>
  //         <p className="bg-gray-200 py-2 px-1">
  //           {" "}
  //           Transmission: {carInfo?.fields?.transmission}{" "}
  //         </p>
  //         <p className="bg-gray-300 py-2 px-1">
  //           {" "}
  //           Year: {carInfo?.fields?.year}{" "}
  //         </p>
  //       </div>
  //     </section>
  //   </section>
  // );
};

export default ProductDetails;
