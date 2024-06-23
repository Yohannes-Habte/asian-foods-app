import sql from "../../db/connection.js";
import createError from "http-errors";

//====================================================================
// Create comment
//====================================================================

export const createComment = async (req, res, next) => {
  const { email, comment, userID } = req.body;

  if (!email || !comment || !userID) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Fetch user from the database
    const userQuery = await sql`SELECT * FROM users WHERE user_id = ${userID}`;

    // Check if user exists
    if (userQuery.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const result =
      await sql`INSERT INTO comments(email, comment, userID) VALUES(${email}, ${comment}, ${userID}) RETURNING *`;

    res.status(201).json({
      success: true,
      comment: result[0],
      message: "Comment successfully created",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

//====================================================================
// Get comments
//====================================================================

export const getComments = async (req, res, next) => {
  try {
    const result = await sql`SELECT * FROM comments`;

    res.status(200).json({
      success: true,
      comments: result,
      message: "Comments successfully fetched",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

//====================================================================
// Get comment
//====================================================================

export const getComment = async (req, res, next) => {
  const commentId = req.params.id;
  if (!commentId) {
    return next(createError(400, "Invalid comment ID format"));
  }
  try {
    const result =
      await sql`SELECT * FROM comments WHERE comment_id = ${commentId}`;

    if (result.length === 0) {
      return next(createError(404, "Comment not found"));
    }

    res.status(200).json({
      success: true,
      comment: result[0],
      message: "Comment successfully fetched",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

//====================================================================
// Delete comment
//====================================================================

export const deleteComment = async (req, res, next) => {
  const commentId = req.params.id;

  try {
    const result =
      await sql`DELETE FROM comments WHERE comment_id = ${commentId} RETURNING *`;

    if (result.count === 0) {
      return next(createError(404, "Comment not found"));
    }

    res.status(200).json({
      success: true,
      comment: result[0],
      message: "Comment successfully deleted",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};
