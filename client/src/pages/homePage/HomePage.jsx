import { useEffect, useState } from "react";
import "./HomePage.css";
import ProductCarousel from "../../components/carousel/ProductCarousel";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import GlobalFunction from "../../utils/GlobalFunction";
import BigProductCart from "../../components/products/bigProductCart/BigProductCart";
import FilterForm from "../../components/filterForm/FilterForm";
import PageLoader from "../../components/loader/PageLoader";
import UsedCars from "../../components/products/landingProducts/UsedCars";
import NewCars from "../../components/products/landingProducts/NewCars";
import Services from "../../components/services/Services";
import { clientProducts } from "../../utils/clientProducts";
import SearchResultCart from "../../components/products/searchResultCart/SearchResultCart";

// Search car brand
const getBrand = async (brand) => {
  try {
    const getCarsOfBrand = await clientProducts.getEntries({
      content_type: "cars",
      "fields.brand": brand,
    });
    return getCarsOfBrand.items;
  } catch (error) {
    console.error(error.message);
  }
};

const initialState = {
  brand: "",
  power: "",
  year: "",
  color: "",
  price: "",
  fuel: "",
  brands: "",
};

const HomePage = () => {
  const { loading, data, getProducts } = GlobalFunction();
  const { getProducts: getData } = GlobalFunction();

  // Local state variable
  const [filters, setFilters] = useState(initialState);
  const [brands, setBrands] = useState([]);

  const updateChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Reset state variable
  const reset = () => {
    setFilters({
      brand: "",
      power: "",
      year: "",
      color: "",
      price: "",
      fuel: "",
      brands: "",
    });
  };

  useEffect(() => {
    getProducts("cars", 6, 0);

    return () => {};
  }, []);

  // Carousel data
  const cardsData = data.map((featuredCar) => (
    <BigProductCart key={featuredCar?.sys.id} data={featuredCar} />
  ));

  return (
    <main className="home-page">
      <Header />

      <section className="container mx-auto">
        <h1 className="headline-text"> We sell your dream car !</h1>

        <FilterForm
          getData={getData}
          data={data}
          filters={filters}
          setFilters={setFilters}
          updateChange={updateChange}
          reset={reset}
          brands={brands}
          setBrands={setBrands}
          getBrand={getBrand}
        />

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

            <NewCars />

            <UsedCars />
          </>
        )}
      </section>
      <Services />

      <Footer />
    </main>
  );
};

export default HomePage;
