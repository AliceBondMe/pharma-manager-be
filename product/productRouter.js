import express from "express";

import authenticate from "../middlewares/authenticate.js";
import productController from "./productController.js";
import checkId from "../middlewares/checkId.js";

const productRouter = express.Router();

productRouter.get("/", authenticate, productController.getAllProducts);

productRouter.get(
  "/:id",
  authenticate,
  checkId,
  productController.getOneProduct
);

export default productRouter;
