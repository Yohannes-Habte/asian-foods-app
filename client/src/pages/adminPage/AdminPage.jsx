import { useState } from "react";
import AdminMainContent from "../../components/admin/adminMain/AdminMainContent";
import AdminSidebar from "../../components/admin/adminSidebar/AdminSidebar";
import "./AdminPage.scss";
import Footer from "../../components/layout/footer/Footer";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const AdminPage = () => {
  const [active, setActive] = useState(1);
  return (
    <main className="admin-page">
      <section className="admin-page-container">
        <h1 className="admin-page-title">
          <Link to={"/"}>
            <FaArrowAltCircleLeft
              title="Return Home Page"
              className="go-back-icon"
            />{" "}
          </Link>{" "}
          Admin Dashboard
        </h1>

        <div className="admin-sidebar-and-main-wrapper">
          <AdminSidebar active={active} setActive={setActive} />

          <AdminMainContent active={active} />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AdminPage;
