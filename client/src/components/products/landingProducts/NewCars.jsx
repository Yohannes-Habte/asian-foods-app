import "./LandingPageProducts.css";
import GlobalFunction from "../../../utils/GlobalFunction";
import { useEffect } from "react";
import NewCarCart from "../smallProductCart/NewCarCart";

const NewCars = () => {
  const { data, getProducts } = GlobalFunction();

  const status = data?.fields?.newCar === true ? "New Car" : "Used Car";

  // Display data on browser
  useEffect(() => {
    getProducts("cars", 3, 0);

    return () => {};
  }, []);
  return (
    <section>
      <div className="flex justify-between mb-3 mt-20">
        <h4 className="new-car-text">New luxury car</h4>
        <h4 className="show-more-text">Show more</h4>
      </div>{" "}
      <div className="small-product-cart-wrapper">
        {data && data.map((car) => <NewCarCart key={car.sys.id} car={car} />)}
      </div>
    </section>
  );
};

export default NewCars;
