import { useEffect, useState } from "react";
import "./Orders.scss";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch users data

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:9000/api/v1/orders");
        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, []);
  return (
    <section>
      <h2>List of Orders</h2>

      <table className="product-table">
        <thead className="table-head">
          <tr className="head-tr">
            <th className="head-cell"> Order ID</th>
            <th className="head-cell">Order Image</th>
            <th className="head-cell">Order Name</th>
            <th className="head-cell">Quantity</th>
            <th className="head-cell">Total Price</th>
            <th className="head-cell">Status</th>
            <th className="head-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              const {order_id, order_name, quantity, userID, total_price  } = order
              return (
                <tr key={order_id} className="body-tr">
                  <td className="body-cell"> {order_name} </td>
                  <td className="body-cell"> Image  </td>
                  <td className="body-cell"> {quantity} </td>
                  <td className="body-cell"> {userID} </td>
                  <td className="body-cell"> ${total_price} </td>
                  <td className="body-cell">Pending</td>
                  <td className="body-cell">delete | Edit </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default Orders;
