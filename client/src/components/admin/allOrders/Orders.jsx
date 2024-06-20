import "./Orders.scss";

const Orders = () => {
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
        <tr className="body-tr">
            <td className="body-cell">1</td>
            <td className="body-cell">Image</td>
            <td className="body-cell">Name</td>
            <td className="body-cell">4</td>
            <td className="body-cell">$79</td>
            <td className="body-cell">Pending</td>
            <td className="body-cell">delete | Edit </td>
          </tr>
          <tr className="body-tr">
            <td className="body-cell">1</td>
            <td className="body-cell">Image</td>
            <td className="body-cell">Name</td>
            <td className="body-cell">4</td>
            <td className="body-cell">$79</td>
            <td className="body-cell">Pending</td>
            <td className="body-cell">delete | Edit </td>
          </tr>
          <tr className="body-tr">
            <td className="body-cell">1</td>
            <td className="body-cell">Image</td>
            <td className="body-cell">Name</td>
            <td className="body-cell">4</td>
            <td className="body-cell">$79</td>
            <td className="body-cell">Pending</td>
            <td className="body-cell">delete | Edit </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Orders;
