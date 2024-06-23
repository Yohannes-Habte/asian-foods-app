import "./HomePage.css";
import ProductCarousel from "../../components/carousel/ProductCarousel";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import BigProductCart from "../../components/products/bigProductCart/BigProductCart";
import PageLoader from "../../components/loader/PageLoader";
import Services from "../../components/services/Services";
import LandingFoods from "../../components/products/landingProducts/LandingFoods";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../utils/myLocalURL";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${URL}/foods`);
        setData(data.foods);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("data=", data);

  // Carousel data
  const cardsData = data?.map((food) => (
    <BigProductCart key={food.food_id} food={food} />
  ));

  return (
    <main className="home-page">
      <Header />

      <section className="container mx-auto">
        <h1 className="headline-text"> {"Today's special food!"} </h1>

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
