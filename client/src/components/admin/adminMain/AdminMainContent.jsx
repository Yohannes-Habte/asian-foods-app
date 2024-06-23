import Comments from "../allComments/Comments";
import Orders from "../allOrders/Orders";
import EntireProducts from "../allProducts/EntireProducts";
import Users from "../allUsers/Users";
import "./AdminMainContent.scss";

const AdminMainContent = ({ active }) => {
  return (
    <div>
      {active === 1 && <EntireProducts />}

      {active === 2 && <Users />}

      {active === 3 && <Orders />}

      {active === 4 && <Comments />}
    </div>
  );
};

export default AdminMainContent;
