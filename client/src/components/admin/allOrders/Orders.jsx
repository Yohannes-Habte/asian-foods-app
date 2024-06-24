import { useEffect, useState } from "react";
import "./Orders.scss";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./Orders.scss";
import { URL } from "../../../utils/myLocalURL";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  console.log("Orders=", orders);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get(`${URL}/orders`, {
          withCredentials: true,
        });
        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`${URL}/orders/${orderId}`, {
        withCredentials: true,
      } );
      setOrders(orders.filter((order) => order.order_id !== orderId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="orders-wrapper">
      <h2 className="orders-title">List of Orders</h2>

      <table className="orders-table">
        <thead className="table-head">
          <tr className="head-tr">
            <th className="head-cell"> Order ID</th>
            <th className="head-cell">Order Name</th>
            <th className="head-cell">Quantity</th>
            <th className="head-cell">User ID</th>
            <th className="head-cell">User Address </th>
            <th className="head-cell"> Phone Number </th>
            <th className="head-cell"> Email Address </th>
            <th className="head-cell">Total Price</th>
            <th className="head-cell">Status</th>
            <th className="head-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              const {
                order_id,
                order_name,
                quantity,
                userid,
                address,
                phone,
                email,
                total_price,
                status,
              } = order;
              return (
                <tr key={order_id} className="body-tr">
                  <td className="body-cell"> {order_id} </td>
                  <td className="body-cell"> {order_name} </td>
                  <td className="body-cell"> {quantity} </td>
                  <td className="body-cell"> {userid} </td>
                  <td className="body-cell"> {address} </td>
                  <td className="body-cell"> {phone} </td>
                  <td className="body-cell"> {email} </td>
                  <td className="body-cell"> ${total_price} </td>
                  <td
                    className={status === "Paid" ? "paid" : "body-cell pending"}
                  >
                    {" "}
                    {status}{" "}
                  </td>
                  <td className="body-cell">
                    {" "}
                    <FaTrash
                      onClick={() => deleteOrder(order.order_id)}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                    />{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default Orders;
