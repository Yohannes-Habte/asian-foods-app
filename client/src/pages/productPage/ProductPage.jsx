import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import ProductDetails from "../../components/products/productDetails/ProductDetails";
import "./ProductPage.css";

const ProductPage = () => {
  return (
    <main>
      <Header />

      <section>
        <h1 className="product-detail-text"> Product Details </h1>
        <ProductDetails />
      </section>

      <Footer />
    </main>
  );
};

export default ProductPage;
