import axios from "axios";
import { useEffect, useState } from "react";
import "./Comments.scss";
import { FaTrash } from "react-icons/fa";
import { URL } from "../../../utils/myLocalURL";

const Comments = () => {
  const [comments, setComments] = useState([]);

  // Fetch users data

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get(`${URL}/comments`, {
          withCredentials: true,
        });
        setComments(data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, []);

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`${URL}/comments/${commentId}`, {
        withCredentials: true,
      });
      setComments(
        comments.filter((comment) => comment.comment_id !== commentId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="comments-wrapper">
      <h2 className="comments-title">List of Comments</h2>

      <table className="comments-table">
        <thead className="table-head">
          <tr className="head-tr">
            <th className="head-cell"> ID</th>
            <th className="head-cell"> Email</th>
            <th className="head-cell message">User Message</th>
            <th className="head-cell createAt">CreatedAt</th>
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
                  <td className="body-cell paragraph"> {comment.comment} </td>
                  <td className="body-cell date">
                    {" "}
                    {comment.created_at.slice(0, 10)}{" "}
                  </td>
                  <td className="body-cell">
                    {" "}
                    <FaTrash
                      onClick={() => deleteComment(comment.comment_id)}
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

export default Comments;
