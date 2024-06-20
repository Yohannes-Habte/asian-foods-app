const Comments = () => {
  return (
    <section>
      <h2>List of Comments</h2>

      <table className="product-table">
        <thead className="table-head">
          <tr className="head-tr">
            <th className="head-cell"> Comment ID</th>
            <th className="head-cell"> Email</th>
            <th className="head-cell">Message</th>
            <th className="head-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="body-tr">
            <td className="body-cell">1</td>
            <td className="body-cell">Image@gamil.com</td>
            <td className="body-cell">Message</td>
            <td className="body-cell">delete | Edit </td>
          </tr>
          <tr className="body-tr">
            <td className="body-cell">1</td>
            <td className="body-cell">Image@gamil.com</td>
            <td className="body-cell">Message</td>
            <td className="body-cell">delete | Edit </td>
          </tr>
          <tr className="body-tr">
            <td className="body-cell">1</td>
            <td className="body-cell">Image@gamil.com</td>
            <td className="body-cell">Message</td>
            <td className="body-cell">delete | Edit </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Comments;
