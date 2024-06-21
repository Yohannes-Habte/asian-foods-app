import "./FeaturedProducts.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";

const FeaturedProductsDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <section className="singleCar-details-container">
        <figure>
          <img
            className="single-page-car-image"
            src={food?.image}
            alt={food?.food_name}
          />
        </figure>
        <div className="bg-cyan-100 px-4">
          <div className=" flex items-center justify-between mt-6 bg-cyan-200 px-1 py-2 rounded">
            <div>
              <h3 className="header-singleproduct-detail">
                {" "}
                {food?.food_name}{" "}
              </h3>
            </div>
            <div className="flex gap-2">
              <div>
                <p className="bg-orange-200 py-2 px-2 rounded font-bold">
                  {" "}
                  Price: ${food?.food_price}{" "}
                </p>
              </div>
              <div className="flex  items-center gap-1 rounded bg-cyan-400 px-2">
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
              <p className="bg-cyan-50 py-2 px-1 mb-1">
                Name: {food?.food_name}
              </p>
              <p className="bg-cyan-50 py-2 px-1">Countrs: {food?.country}</p>
            </div>
            <div>
              <p className="bg-cyan-50 py-2 px-1 mb-1">
                Price: ${food?.food_price}
              </p>
              <p className="bg-cyan-50 py-2 px-1"> Spicy: {food?.spicelevel}</p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
  // loading ? (
  //   <PageLoader />
  // ) : (
  //   <section className="mb-10 fituredCar-details-container">
  //     <figure>
  //       <img
  //         className="single-page-car-image"
  //         src={featuredCarInfo?.fields?.image?.fields?.file?.url}
  //         alt={featuredCarInfo?.fields?.brand}
  //       />
  //     </figure>

  //     <div className="header-container flex items-center justify-between mt-6 bg-orange-200 px-1 py-2 rounded">
  //       <div>
  //         <h3 className="header-singleproduct-detail">
  //           {" "}
  //           {featuredCarInfo?.fields?.brand}{" "}
  //         </h3>
  //       </div>
  //       <div className="flex gap-2">
  //         <div>
  //           <p className="bg-orange-200 py-2 px-2 rounded font-bold">
  //             {" "}
  //             Price: ${featuredCarInfo?.fields?.price}{" "}
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
  //         {featuredCarInfo?.fields?.description?.content[0]?.content[0]?.value}
  //       </p>
  //     </div>
  //     <h3 className="font-semibold mt-6 px-2">Specificattion:</h3>

  //     <section className="bg-orange-200 px-1 py-2 rounded grid gap-2 grid-cols-2 mb-60">
  //       <div>
  //         <p className="bg-orange-200 py-2 px-1">
  //           {" "}
  //           Model: {featuredCarInfo?.fields?.model}{" "}
  //         </p>
  //         <p className="bg-orange-300 py-2 px-1">
  //           {" "}
  //           Brand: {featuredCarInfo?.fields?.brand}{" "}
  //         </p>
  //         <p className="bg-orange-200 py-2 px-1">
  //           {" "}
  //           Category: {featuredCarInfo?.fields?.catagory}{" "}
  //         </p>
  //         <p className="bg-orange-300 py-2 px-1">
  //           {" "}
  //           color: {featuredCarInfo?.fields?.colour}{" "}
  //         </p>
  //       </div>
  //       <div>
  //         <p className="bg-orange-200 py-2 px-1"> Status: {status}</p>
  //         <p className="bg-orange-300 py-2 px-1">
  //           {" "}
  //           Performance: {featuredCarInfo?.fields?.performance}{" "}
  //         </p>
  //         <p className="bg-orange-200 py-2 px-1">
  //           {" "}
  //           Transmission: {featuredCarInfo?.fields?.transmission}{" "}
  //         </p>
  //         <p className="bg-orange-300 py-2 px-1">
  //           {" "}
  //           Year: {featuredCarInfo?.fields?.year}{" "}
  //         </p>
  //       </div>
  //     </section>
  //   </section>
  // );
};

export default FeaturedProductsDetails;
