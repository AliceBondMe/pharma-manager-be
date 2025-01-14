import express from "express";

import shopController from "./shopController.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../middlewares/validateBody.js";
import { shopSchema } from "./shopSchema.js";
import checkId from "../middlewares/checkId.js";
import { productEditSchema, productSchema } from "../product/productSchema.js";

const shopRouter = express.Router();

shopRouter.post(
  "/create",
  authenticate,
  validateBody(shopSchema),
  shopController.createShop
);

shopRouter.get("/", authenticate, shopController.getShops);

shopRouter.get("/:id", authenticate, checkId, shopController.getOneShop);

shopRouter.put(
  "/:id/update",
  authenticate,
  checkId,
  validateBody(shopSchema),
  shopController.updateShop
);

shopRouter.delete("/:id", authenticate, checkId, shopController.deleteShop);

shopRouter.post(
  "/:id/product/add",
  authenticate,
  checkId,
  validateBody(productSchema),
  shopController.addProduct
);

shopRouter.post(
  "/:shopId/product/:productId/add",
  authenticate,
  shopController.addProductById
);

shopRouter.put(
  "/:shopId/product/:productId/edit",
  authenticate,
  validateBody(productEditSchema),
  shopController.editProductById
);

shopRouter.delete(
  "/:shopId/product/:productId/delete",
  authenticate,
  shopController.deleteProductById
);

export default shopRouter;
