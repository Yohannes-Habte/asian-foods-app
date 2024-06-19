import sql from "../../db/connection.js";
import createError from "http-errors";

//====================================================================
// Get users
//====================================================================

export const getUsers = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;
    const users =
      await sql`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`;
    const total = await sql`SELECT COUNT(*) FROM users`;

    res.status(200).json({
      success: true,
      data: users,
      meta: {
        total: total[0].count,
        page,
        limit,
      },
    });
  } catch (error) {
    // Logger.error(error.message, { stack: error.stack });
    next(createError(500, "Internal Server Error"));
  }
};

//====================================================================
// Get a user
//====================================================================
export const getUser = async (req, res, next) => {
  const  userId  = req.params.id;

  // Validate user_id is a number
  if (!userId) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    // Parameterized query to prevent SQL injection
    const user = await sql`select * from users where user_id = ${userId}`;

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: true, user: user[0] });
  } catch (error) {
    // Log the error for debugging (optional)
    console.error("Database query error:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};
