import axios from "axios";
import { useEffect, useState } from "react";

const Comments = () => {
  const [comments, setComments] = useState([]);

  // Fetch users data

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:9000/api/v1/comments"
        );
        setComments(data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <section>
      <h2>List of Comments</h2>

      <table className="product-table">
        <thead className="table-head">
          <tr className="head-tr">
            <th className="head-cell"> Comment ID</th>
            <th className="head-cell"> Email</th>
            <th className="head-cell">Message</th>
            <th className="head-cell">CreatedAt</th>
            <th className="head-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {comments &&
            comments.map((comment) => {
              return (
                <tr key={comment.comment_id} className="body-tr">
                  <td className="body-cell"> {comment.comment_id} </td>
                  <td className="body-cell"> {comment.email} </td>
                  <td className="body-cell"> {comment.comment} </td>
                  <td className="body-cell"> {comment.created_at.slice(0, 10)} </td>
                  <td className="body-cell">delete | Edit </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default Comments;
