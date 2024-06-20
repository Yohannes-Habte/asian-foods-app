import { useEffect, useState } from "react";
import "./HomePage.css";
import ProductCarousel from "../../components/carousel/ProductCarousel";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import GlobalFunction from "../../utils/GlobalFunction";
import BigProductCart from "../../components/products/bigProductCart/BigProductCart";
import FilterForm from "../../components/filterForm/FilterForm";
import PageLoader from "../../components/loader/PageLoader";
// import UsedCars from "../../components/products/landingProducts/UsedCars";
// import NewCars from "../../components/products/landingProducts/NewCars";
import Services from "../../components/services/Services";
// import { clientProducts } from "../../utils/clientProducts";
import SearchResultCart from "../../components/products/searchResultCart/SearchResultCart";
import LandingFoods from "../../components/products/landingProducts/LandingFoods";
import { SpecialFoods } from "../../../../Data/SpecialFoods.js";

// Search car brand
const getBrand = async (brand) => {};

const initialState = {
  name: "",
  price: "",
  spicelevel: "",
  conutry: "",
};

const HomePage = () => {
  const { data, loading, error } = GlobalFunction("http://localhost:9000/");
  const [specialFoods, setSpecialFoods] = useState([]);
  const getAllSpecialFoods = async () => {
    try {
      setSpecialFoods(SpecialFoods);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Local state variable
  const [filters, setFilters] = useState(initialState);
  const [brands, setBrands] = useState([]);

  const updateChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // // Reset state variable
  // const reset = () => {
  //   setFilters({
  //     name: "",
  //     price: "",
  //     spicelevel: "",
  //     conutry: "",
  //   });
  // };

  useEffect(() => {
    getAllSpecialFoods();

    return () => {};
  }, []);

  // Carousel data
  const cardsData = specialFoods.map((food) => (
    <BigProductCart key={food?.id} food={food} />
  ));

  return (
    <main className="home-page">
      <Header />

      <section className="container mx-auto">
        <FilterForm
          filters={filters}
          setFilters={setFilters}
          updateChange={updateChange}
          // reset={reset}
        />
        <h1 className="headline-text"> Today's special food!</h1>

        <div className="filter-result-wrapper">
          {brands &&
            brands?.map((car) => {
              return <SearchResultCart key={car.sys.id} car={car} />;
            })}
        </div>

        {loading ? (
          <div className="home-page-loader">
            <PageLoader />
          </div>
        ) : (
          <>
            <ProductCarousel data={cardsData} loading={loading} />
            <LandingFoods />
          </>
        )}
      </section>
      <Services />

      <Footer />
    </main>
  );
};

export default HomePage;
