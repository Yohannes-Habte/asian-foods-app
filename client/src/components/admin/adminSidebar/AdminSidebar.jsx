import "./AdminSidebar.scss";

const AdminSidebar = ({ active, setActive }) => {
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
          Add Product
        </li>
        <li
          onClick={() => setActive(3)}
          className={active === 3 ? "active-item" : "passive-item"}
        >
          Users
        </li>
        <li
          onClick={() => setActive(4)}
          className={active === 4 ? "active-item" : "passive-item"}
        >
          Orders
        </li>
        <li
          onClick={() => setActive(5)}
          className={active === 5 ? "active-item" : "passive-item"}
        >
          Comments
        </li>

        <li className={active === 5 ? "active-item" : "passive-item"}>
          Logout
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
