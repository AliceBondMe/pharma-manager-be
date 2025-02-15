import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import userRouter from "./user/userRouter.js";
import shopRouter from "./shop/shopRouter.js";
import productRouter from "./product/productRouter.js";
import statisticsRouter from "./statistics/statisticsRouter.js";

export const app = express();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/product", productRouter);
app.use("/api/statistics", statisticsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default mongoose;
