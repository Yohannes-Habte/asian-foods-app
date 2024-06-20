import AddProduct from "../addProduct/AddProduct";
import Comments from "../allComments/Comments";
import Orders from "../allOrders/Orders";
import EntireProducts from "../allProducts/EntireProducts";
import Users from "../allUsers/Users";
import "./AdminMainContent.scss";

const AdminMainContent = ({ active }) => {
  return (
    <div>
      {active === 1 && <EntireProducts />}

      {active === 2 && <AddProduct />}

      {active === 3 && <Users />}

      {active === 4 && <Orders />}

      {active === 5 && <Comments />}
    </div>
  );
};

export default AdminMainContent;
