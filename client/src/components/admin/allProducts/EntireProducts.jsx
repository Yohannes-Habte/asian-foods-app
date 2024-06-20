import "./EntireProducts.scss";

const EntireProducts = () => {
  
  return (
    <section>
      <h2> List of Products </h2>

      <table className="product-table">
   
        <thead className="table-head">
          <tr className="head-tr">
            <th className="head-cell"> Product ID</th>
            <th className="head-cell">Product Name</th>
            <th className="head-cell">Photo</th>
            <th className="head-cell">Product Price</th>
            <th className="head-cell">Description</th>
            <th className="head-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="body-tr">
            <td className="body-cell">1</td>
            <td className="body-cell">Grill</td>
            <td className="body-cell">Image</td>
            <td className="body-cell">$35</td>
            <td className="body-cell"> Outstanding product</td>
            <td className="body-cell">delete | Edit </td>
          </tr>
          <tr className="body-tr">
            <td className="body-cell">1</td>
            <td className="body-cell">Grill</td>
            <td className="body-cell">Image</td>
            <td className="body-cell">$35</td>
            <td className="body-cell"> Outstanding product</td>
            <td className="body-cell">delete | Edit </td>
          </tr>
          <tr className="body-tr">
            <td className="body-cell">1</td>
            <td className="body-cell">Grill</td>
            <td className="body-cell">Image</td>
            <td className="body-cell">$35</td>
            <td className="body-cell"> Outstanding product</td>
            <td className="body-cell">delete | Edit </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default EntireProducts;
