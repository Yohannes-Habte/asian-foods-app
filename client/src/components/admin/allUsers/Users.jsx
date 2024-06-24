import { useEffect, useState } from "react";
import "./Users.scss";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { URL } from "../../../utils/myLocalURL";

const Users = () => {
  const [userData, setUserData] = useState([]);
  console.log("users=", userData);

  // Fetch users data

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get(`${URL}/users`, {
          withCredentials: true,
        });
        setUserData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${URL}/auth/${userId}`,{
        withCredentials: true,
      });
      setUserData(userData.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="users-wrapper">
      <h2 className="users-title">List of Users</h2>

      <table className="users-table">
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
          {userData &&
            userData.map((user) => {
              return (
                <tr key={user.user_id} className="body-tr">
                  <td className="body-cell"> {user.user_id} </td>
                  <td className="body-cell"> {user.first_name} </td>
                  <td className="body-cell"> {user.last_name} </td>
                  <td className="body-cell"> {user.email} </td>
                  <td className="body-cell">
                    <FaTrash
                      onClick={() => deleteUser(user.user_id)}
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

export default Users;
