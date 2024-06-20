import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/cart/CartProvider";
import { UserContext } from "../../../context/user/UserProvider";
import { FaShoppingCart, FaUserCircle, FaBars } from "react-icons/fa";
import { PiBowlFoodFill } from "react-icons/pi";
import { MdClose } from "react-icons/md";

const Header = () => {
  // Global state variables
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(UserContext);

  // Local state variables
  const [openNavbar, setOpenNavbar] = useState(false);

  const onClick = () => {
    setOpenNavbar(!openNavbar);
  };

  const navLinkStyles = ({ isActive }) => {
    return isActive ? "font-bold text-orange-400" : "text-white";
  };
  return (
    <header className="header">
      <div className="header-wrapper">
        <Link to="/">
          <div className="logo-header flex gap-2 items-center sm:justify-center md:justify-start">
            <PiBowlFoodFill /> <div className="logo-header">myFood</div>
          </div>
        </Link>
        <nav className="navbar-wrapper flex space-x-10 sm:justify-center md:justify-end">
          <ul
            className={
              openNavbar ? "navbar-menu active-navbar-menu" : "navbar-menu"
            }
          >
            <li>
              <NavLink className={navLinkStyles} to="/">
                {" "}
                Home{" "}
              </NavLink>{" "}
            </li>
            <li>
              <NavLink className={navLinkStyles} to="/products">
                {" "}
                Products{" "}
              </NavLink>{" "}
            </li>
            <li>
              <NavLink className={navLinkStyles} to="/contact">
                {" "}
                Contact{" "}
              </NavLink>{" "}
            </li>
          </ul>

          <ul className="flex gap-6 items-center">
            <li>
              <NavLink className={navLinkStyles} to={"/cart"}>
                <div className="cart-container">
                  <FaShoppingCart />
                </div>
                <div className="cart-items">
                  {" "}
                  {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}{" "}
                </div>
              </NavLink>
            </li>

            <li>
              {user && user ? (
                <span className="flex">
                  <FaUserCircle /> {user?.email}
                </span>
              ) : (
                <Link to={"/login"} className="login">
                  {" "}
                  Login
                </Link>
              )}
            </li>
          </ul>

          {/* Screen size management */}
          <div onClick={onClick} className="icon-screen-size-handler-wrapper">
            {openNavbar ? (
              <MdClose className="close-menu-icon" />
            ) : (
              <FaBars className="open-menu-icon" />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
