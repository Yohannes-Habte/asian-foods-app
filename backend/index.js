import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import sql from "./db/connection.js"

// Router
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth/index.js";
import userRouter from "./routes/user/index.js"
import foodRouter from "./routes/food/index.js";
import orderRouter from "./routes/order/index.js";
import commentRouter from "./routes/comment/index.js";
import globalErrorHandler from "./middleware/errorHandler/globalErrorHandler.js";

// Express app
const app = express();
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Security key holder
dotenv.config();


// End points
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users",  userRouter);
app.use("/api/v1/foods", foodRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/comments", commentRouter);

// Global error handler
app.use(globalErrorHandler);

// Server Listner
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`The server starts on port ${port}`.blue.bold);
});
