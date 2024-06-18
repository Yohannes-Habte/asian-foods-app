import { useEffect } from "react";
import "./AllProducts.css";
import GlobalFunction from "../../../utils/GlobalFunction";
import PageLoader from "../../loader/PageLoader";
import SmallProductCart from "../smallProductCart/SmallProductCart";

const AllProducts = () => {
  const { loading, data, getProducts } = GlobalFunction();

  console.log("all cars data =", data);

  // Display data on browser
  useEffect(() => {
    getProducts("cars", 12, 0);

    return () => {};
  }, []);

  return (
    <section>
      {/* <h3>List of Products</h3> */}
      {loading ? (
        <div className="small-product-cart-page-loader">
          <PageLoader />
        </div>
      ) : (
        <div className="small-product-cart-wrapper">
          {data &&
            data.length !== 0 &&
            data.map((car) => <SmallProductCart key={car.sys.id} car={car} />)}
        </div>
      )}
    </section>
  );
};

export default AllProducts;
