import { useEffect, useState } from "react";
import "./Users.scss";
import axios from "axios"

const Users = () => {
  const [userData, setUserData] = useState([])


  // Fetch users data

  useEffect(() => {
const fetchAllUsers = async () => {
  try {
    const  {data} = await axios.get("http://localhost:9000/api/v1/users")
    setUserData(data)
  } catch (error) {
    console.log(error)
  }
}
fetchAllUsers()
  }, [])

  return (
    <section>
      <h2>List of Users</h2>

      <table className="product-table">
        <thead className="table-head">
          <tr className="head-tr">
            <th className="head-cell"> User ID</th>
            <th className="head-cell">First Name</th>
            <th className="head-cell">Last Name</th>
            <th className="head-cell">Email</th>
            <th className="head-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="body-tr">
            <td className="body-cell">1</td>
            <td className="body-cell">John</td>
            <td className="body-cell">Doe</td>
            <td className="body-cell">John@gmail.com</td>
            <td className="body-cell">delete | Edit </td>
          </tr>
          <tr className="body-tr">
            <td className="body-cell">1</td>
            <td className="body-cell">John</td>
            <td className="body-cell">Doe</td>
            <td className="body-cell">John@gmail.com</td>
            <td className="body-cell">delete | Edit </td>
          </tr>
          <tr className="body-tr">
            <td className="body-cell">1</td>
            <td className="body-cell">John</td>
            <td className="body-cell">Doe</td>
            <td className="body-cell">John@gmail.com</td>
            <td className="body-cell">delete | Edit </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Users;
