import sql from "../../db/connection.js";
import createError from "http-errors";

//====================================================================
// Create Food
//====================================================================

export const createFood = async (req, res, next) => {
  const { food_name, food_price, description, country, spiceLevel, image } =
    req.body;

  // Check if all required fields are present
  if (
    !food_name ||
    !food_price ||
    !description ||
    !country ||
    !spiceLevel ||
    !image
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result =
      await sql`INSERT INTO foods (food_name, food_price, description, country, spiceLevel, image) 
                 VALUES (${food_name}, ${food_price}, ${description}, ${country}, ${spiceLevel}, ${image}) RETURNING *`;

    res.status(201).json({
      success: true,
      food: result[0],
      message: "Food successfully created",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

//====================================================================
// Get All Foods
//====================================================================
export const getAllFoods = async (req, res, next) => {
  try {
    const result = await sql`SELECT * FROM foods`;

    res.status(200).json({
      success: true,
      foods: result,
      message: "Foods successfully fetched",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

//====================================================================
// Get Single food
//====================================================================
export const getFood = async (req, res, next) => {
  const foodId = req.params.id;

  if (!foodId) {
    return next(createError(400, "Food ID not found"));
  }

  try {
    const result = await sql`SELECT * FROM foods WHERE food_id = ${foodId}`;

    if (result.length === 0) {
      return next(createError(404, "Food not found"));
    }

    res.status(200).json({
      success: true,
      food: result[0],
      message: "Food successfully fetched",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

//====================================================================
// Delete Single Food
//====================================================================

export const updateFood = async (req, res, next) => {
  const { food_name, food_price, description, country, spiceLevel, image } =
    req.body;
  const foodId = req.params.id;

  try {
    const result = await sql`
        UPDATE foods 
        SET food_name = ${food_name}, 
            food_price = ${food_price}, 
            description = ${description}, 
            country = ${country}, 
            spiceLevel = ${spiceLevel}, 
            image = ${image}
        WHERE food_id = ${foodId} 
        RETURNING *`;

    if (result.length === 0) {
      return next(createError(404, "Food not found"));
    }

    res.status(200).json({
      success: true,
      food: result[0],
      message: "Food successfully updated",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

//====================================================================
// Delete Single Food
//====================================================================

export const deleteFood = async (req, res, next) => {
  const foodId = req.params.id;

  try {
    const result = await sql`
        DELETE FROM foods 
        WHERE food_id = ${foodId} 
        RETURNING *`;

    if (result.length === 0) {
      return next(createError(404, "Food not found"));
    }

    res.status(200).json({
      success: true,
      food: result[0],
      message: "Food successfully deleted",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};
