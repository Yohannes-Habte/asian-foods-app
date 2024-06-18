import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import FeaturedProductsDetails from "../../components/products/featuredProduct/FeaturedProducts";
import "./FeaturedProductPage.css";

const FeaturedProductPage = () => {
  return (
    <main>
      <Header />
      <section className="feturedCar-details-container">
        <h1 className="featured-card-title">
          Featured Car Detail Information{" "}
        </h1>

        <FeaturedProductsDetails />
      </section>

      <Footer />
    </main>
  );
};

export default FeaturedProductPage;
