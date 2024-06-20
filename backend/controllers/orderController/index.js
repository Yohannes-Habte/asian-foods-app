import sql from "../../db/connection.js";
import createError from "http-errors";

//====================================================================
// Create Order
//====================================================================
export const createOrder = async (req, res, next) => {
  const { order_name, quantity, userID, total_price } = req.body;

  // Check if all fields are provided
  if (!order_name || !quantity || !userID || !total_price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Fetch user from the database
    const userQuery = await sql`SELECT * FROM users WHERE user_id = ${userID}`;

    // Check if user exists
    if (userQuery.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Insert order into the database
    const result = await sql`
            INSERT INTO orders ( order_name, quantity, userID, total_price) 
            VALUES ( ${order_name}, ${quantity}, ${userID}, ${total_price}) 
            RETURNING *`;

    // Send a success response
    res.status(201).json({
      success: true,
      order: result[0],
      message: "Your order was successful",
    });
  } catch (error) {
    console.error("Database Error:", error);
    if (error.code === "42703") {
      next(createError(500, "Column does not exist in the table"));
    } else {
      next(createError(500, "Internal Server Error"));
    }
  }
};
//====================================================================
// Get All Orders
//====================================================================

export const getAllOrders = async (req, res, next) => {
  try {
    const result = await sql`SELECT * FROM orders`;

    res.status(200).json({
      success: true,
      orders: result,
      message: "Orders successfully fetched",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

//====================================================================
// Get Single Order
//====================================================================

export const getOrder = async (req, res, next) => {
  const orderId = req.params.id;

  if (!orderId) {
    return next(createError(400, "Order ID not found"));
  }

  try {
    const result =
      await sql`SELECT * FROM orders WHERE order_id = ${orderId}`;

    if (result.length === 0) {
      return next(createError(404, "Order not found"));
    }

    res.status(200).json({
      success: true,
      order: result[0],
      message: "Order retrieval successful",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

//====================================================================
// Delete an Order
//====================================================================
export const deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;

  if (!orderId) {
    return next(createError(400, "Order ID not found"));
  }

  try {
    const result =
      await sql`DELETE FROM orders WHERE order_id = ${orderId} RETURNING *`;

    if (result.count === 0) {
      return next(createError(404, "Order not found"));
    }

    res.status(200).json({
      success: true,
      order: result[0],
      message: "Order successfully deleted",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};
