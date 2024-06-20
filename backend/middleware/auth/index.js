import createError from "http-errors";
import jwt from "jsonwebtoken";
import sql from "../../db/connection.js";

//====================================================================
// auth user
//====================================================================
export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.user_token;
    if (!token) {
      return next(createError(401, "User is not authenticated. Please login!"));
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return next(createError(401, "Token has expired. Please login again."));
      } else if (err.name === "JsonWebTokenError") {
        return next(createError(401, "Invalid token. Please login again."));
      } else {
        return next(createError(500, "Failed to authenticate token."));
      }
    }

    const result =
      await sql`SELECT * FROM users WHERE user_id = ${decodedToken.id}`;
    if (!result || result.length === 0) {
      return next(createError(403, "User is not authorized."));
    }

    req.user = result[0];
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return next(createError(500, "Internal Server Error."));
  }
};

//====================================================================
// auth admin
//====================================================================
export const authAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.user_token;

    if (!token) {
      return next(createError(401, "User is not authenticated. Please login!"));
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return next(createError(401, "Invalid token. Please login again."));
    }

    let result;
    try {
      result =
        await sql`SELECT * FROM users WHERE user_id = ${decodedToken.id}`;
    } catch (error) {
      console.error("Database query error:", error);
      return next(createError(500, "An error occurred during authentication."));
    }

    if (result && result.length > 0 && result[0].isAdmin) {
      return next();
    } else {
      return next(createError(403, "User is not authorized."));
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return next(createError(500, "An error occurred during authentication."));
  }
};
