import createError from "http-errors";
import JWT from "jsonwebtoken";

//====================================================================
// auth user
//====================================================================
export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.user_token;
    console.log("User token =", token);

    if (!token) {
      return next(createError(401, "User is not authenticated. Please login!"));
    }

    const decodedToken = JWT.verify(token, process.env.JWT_USER_SECRET);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return next(createError(403, "User is not authorized."));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return next(createError(500, "User could not access such data."));
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

    const decodedToken = JWT.verify(token, process.env.JWT_USER_SECRET);

    const user = await User.findById(decodedToken.id);

    if (user && user.isAdmin) {
      next();
    } else {
      return next(createError(403, "User is not authorized."));
    }
  } catch (error) {
    console.log(error);
    return next(createError(500, "User could not access such data."));
  }
};
