import "./LandingPageProducts.css";
import GlobalFunction from "../../../utils/GlobalFunction";
import { useEffect } from "react";
import UsedCarCart from "../userCarCart/UsedCarCart";

const UsedCars = () => {
  const { data, getProducts } = GlobalFunction();

  const status = data?.fields?.newCar === true ? "New Car" : "Used Car";

  // Display data on browser
  useEffect(() => {
    getProducts("cars", 3, 3);

    return () => {};
  }, []);
  return (
    <section>
      <div className="flex justify-between mb-3 mt-20">
        <h4 className="new-car-text">Used car</h4>
        <h4 className="show-more-text">Show more</h4>
      </div>{" "}
      <div className="small-product-cart-wrapper">
        {status === "Used Car" &&
          data.map((car) => <UsedCarCart key={car.sys.id} car={car} />)}
      </div>
    </section>
  );
};

export default UsedCars;
