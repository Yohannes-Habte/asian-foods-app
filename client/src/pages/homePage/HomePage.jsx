import { useEffect, useState } from "react";
import "./HomePage.css";
import ProductCarousel from "../../components/carousel/ProductCarousel";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
// import GlobalFunction from "../../utils/GlobalFunction";
import BigProductCart from "../../components/products/bigProductCart/BigProductCart";
import FilterForm from "../../components/filterForm/FilterForm";
import PageLoader from "../../components/loader/PageLoader";
// import UsedCars from "../../components/products/landingProducts/UsedCars";
// import NewCars from "../../components/products/landingProducts/NewCars";
import Services from "../../components/services/Services";
// import { clientProducts } from "../../utils/clientProducts";
import SearchResultCart from "../../components/products/searchResultCart/SearchResultCart";
import LandingFoods from "../../components/products/landingProducts/LandingFoods";
// import { SpecialFoods } from "../../../../Data/SpecialFoods.js";
import GlobalFunction from "../../utils/GlobalFunction";
import axios from "axios";
// Search car brand
const getBrand = async (brand) => {};

const initialState = {
  name: "",
  price: "",
  spicelevel: "",
  conutry: "",
};

const HomePage = () => {
  // Local state variable
  const [filters, setFilters] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [specialFoods, setSpecialFoods] = useState([]);

  // Reset state variable
  const reset = () => {
    setFilters({
      name: "",
      price: "",
      spicelevel: "",
      conutry: "",
    });
  };

  const getAllSpecialFoods = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:9000/api/v1/foods`);
      setSpecialFoods(data.foods);
      setLoading(false);
      reset();
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSpecialFoods();

    return () => {};
  }, []);

  const updateChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Carousel data
  const cardsData = specialFoods.map((food) => (
    <BigProductCart key={food.food_id} food={food} />
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
