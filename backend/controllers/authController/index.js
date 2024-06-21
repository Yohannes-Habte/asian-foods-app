import sql from "../../db/connection.js";
import userToken from "../../middleware/token/generateToken.js";
import createError from "http-errors";
import bcrypt from "bcryptjs";

//=========================================================================
// Create an account
//=========================================================================

export const createAccount = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the email already exists
    const checkEmail = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (checkEmail.length > 0) {
      return next(createError(400, "Email already exists"));
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userQuery = await sql`
      INSERT INTO users (first_name, last_name, email, password) 
      VALUES (${firstName}, ${firstName}, ${email}, ${hashedPassword}) 
      RETURNING *;
    `;

    const user = userQuery[0];

    // generate user token
    const userRegisterToken = userToken(user.user_id);

    return res
      .cookie("user_token", userRegisterToken, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true,
      })
      .status(201)
      .json({
        success: true,
        user,
        message: "Account successfully created",
      });
  } catch (error) {
    next(createError(500, "Database query failed!"));
  }
};

//=========================================================================
// Login user
//=========================================================================

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await sql`SELECT * FROM users WHERE email = ${email}  `;

    // Ensure to get the user object correctly
    const user = result.length > 0 ? result[0] : null;

    // If user does not exist in the database, then ...
    if (!user) {
      return next(
        createError(400, "This email does not exist! Please sign up!")
      );
    }

    //If user exists in the database, then check password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(400, "Invalid password!"));
    }

    // Generate user token
    const loginToken = userToken(user.user_id);

    return res
      .cookie("user_token", loginToken, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        user,
        message: "Successfully logged in!",
      });
  } catch (error) {
    console.error(error);
    next(createError(500, "Database query failed!"));
  }
};

//=========================================================================
// Update user info
//=========================================================================
export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const { first_name, last_name, password } = req.body;

  // Check if all required fields are present
  if (!first_name || !last_name || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Execute the SQL update query
    const result = await sql`
      UPDATE users 
      SET first_name = ${first_name}, last_name = ${last_name}, password = ${hashedPassword} 
      WHERE user_id = ${userId} 
      RETURNING *;
    `;

    // Check if a user was updated
    if (result.count === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with success message and updated user data
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: result[0],
    });
  } catch (error) {
    console.log(error);
    // Handle database errors or bcrypt errors
    next(createError(500, "Database query failed!"));
  }
};

//=========================================================================
// Logout user
//=========================================================================

export const userLogout = async (req, res, next) => {
  try {
    res.cookie("user_token", null, {
      httpOnly: true,
      expires: new Date(0), // cookie is expired
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({
      success: true,
      message: "User successfully logged out",
    });
  } catch (error) {
    next(createError(500, "Database query failed!"));
  }
};

//=========================================================================
// Delete a user
//=========================================================================

export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  // Input validation: Check if userId is provided
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Execute the DELETE query
    const result =
      await sql`DELETE FROM users WHERE user_id = ${userId} RETURNING *`;

    if (result.count === 0) {
      return next(createError(404, "User not found"));
    }

    // Respond with success message and deleted user data
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: result[0],
    });
  } catch (error) {
    // Handle any errors that occur during the query execution
    next(createError(500, "Database query failed!"));
  }
};
