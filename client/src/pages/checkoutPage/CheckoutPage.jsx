import { useContext, useState } from "react";
import "./CheckoutPage.scss";
import { CartContext } from "../../context/cart/CartProvider";
import { UserContext } from "../../context/user/UserProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../utils/myLocalURL";

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [userOrder, setUserOrder] = useState({
    address: "",
    phone: "",
    email: "",
  });

  const order_name = cartItems.map((food) => food.food_name);
  const quantity = cartItems.length;
  const country = cartItems.map((food) => food.country);
  const userID = user.user_id;
  const total_price = cartItems.reduce((acc, curr) => {
    return acc + curr.food_price * curr.quantity;
  }, 0);

  const { address, phone, email } = userOrder;

  const handleChange = (e) => {
    setUserOrder({
      ...userOrder,
      [e.target.name]: e.target.value,
    });
  };
  const handleReset = () => {
    setUserOrder({
      address: "",
      phone: "",
      email: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newOrder = {
        order_name: order_name,
        quantity: quantity,
        country: country,
        userID: userID,
        total_price: total_price,
        address: address,
        phone: phone,
        email: email,
      };
      const { data } = await axios.post(`${URL}/orders/new`, newOrder);
      toast.success(data.message);
      handleReset();
      localStorage.removeItem("cartItems");
      // To reload the current page
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <main className="checkout-page">
      <section className="checkout-page-container">
        <h1 className="checkout-page-title">Checkout Page</h1>

        <form
          onSubmit={handleSubmit}
          action=""
          className="checkout-form bg-cyan-900"
        >
          <div className="inputs-wrapper">
            <div className="flex flex-col gap-1 my-5">
              <label htmlFor="order_name mb-5">Order Name</label>
              <input
                type="text"
                name="order_name"
                id="order_name"
                value={order_name}
                onChange={handleChange}
                placeholder="Order Name"
                className="border-none p-2 text-black rounded outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 my-5">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={handleChange}
                placeholder="Order Quantity"
                className="border-none p-2 text-black rounded outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 my-5">
              <label htmlFor="country"> Country </label>
              <input
                type="text"
                name="country"
                value={country}
                onChange={handleChange}
                placeholder="User ID"
                className="border-none p-2 text-black rounded outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 my-5">
              <label htmlFor="userID">User ID</label>
              <input
                type="number"
                name="userID"
                id="userID"
                value={userID}
                onChange={handleChange}
                placeholder="User ID"
                className="border-none p-2 text-black rounded outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 my-5">
              <label htmlFor="total_price">Total Price</label>
              <input
                type="number"
                name="total_price"
                id="total_price"
                value={total_price}
                onChange={handleChange}
                placeholder="Total Order Price"
                className="border-none p-2 text-black rounded outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 my-5">
              <label htmlFor="address">Physical Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={handleChange}
                placeholder="Street, Zip Code, City, Country"
                className="border-none p-2 text-black rounded outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 my-5">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border-none p-2 text-black rounded outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 my-5">
              <label htmlFor="phone">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                placeholder="Email Address (Optional)"
                className="border-none p-2 text-black rounded outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-cyan-600 w-40 mt-3 py-2 rounded-3xl hover:bg-orange-400 text-semibold"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default CheckoutPage;
