import { useContext } from "react";
import "./AdminSidebar.scss";
import { UserContext } from "../../../context/user/UserProvider";
import { USER_ACTION } from "../../../context/user/UserReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  // Handle logout
  const handleLogout = async () => {
    try {
      dispatch({ type: USER_ACTION.LOGOUT_START });

      const { data } = await axios.get(
        "http://localhost:9000/api/v1/auth/logout"
      );

      dispatch({
        type: USER_ACTION.LOGOUT_SUCCESS,
        payload: data.message,
      });
      localStorage.removeItem("userInfo");
      navigate("/login");
      toast.success(data.message);
    } catch (error) {
      dispatch({
        type: USER_ACTION.LOGOUT_FAIL,
        payload: toast.error(error.response.data.message),
      });
    }
  };

  return (
    <aside className="admin-sidebar-wrapper">
      <h4 className="admin-sidebar-title"> Sidebar</h4>

      <ul className="sidebar-items">
        <li
          onClick={() => setActive(1)}
          className={active === 1 ? "active-item" : "passive-item"}
        >
          Products
        </li>
      
        <li
          onClick={() => setActive(2)}
          className={active === 2 ? "active-item" : "passive-item"}
        >
          Users
        </li>
        <li
          onClick={() => setActive(3)}
          className={active === 3 ? "active-item" : "passive-item"}
        >
          Orders
        </li>
        <li
          onClick={() => setActive(4)}
          className={active === 4 ? "active-item" : "passive-item"}
        >
          Comments
        </li>

        <li
          onClick={handleLogout}
          className={active === 5 ? "active-item" : "passive-item"}
        >
          Logout
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
