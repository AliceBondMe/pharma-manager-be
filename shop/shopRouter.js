import express from "express";

import shopController from "./shopController.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../middlewares/validateBody.js";
import { shopSchema } from "./shopSchema.js";
import checkId from "../middlewares/checkId.js";

const shopRouter = express.Router();

shopRouter.post(
  "/create",
  authenticate,
  validateBody(shopSchema),
  shopController.createShop
);

shopRouter.get("/:id", authenticate, checkId, shopController.getOneShop);

shopRouter.put(
  "/:id/update",
  authenticate,
  checkId,
  validateBody(shopSchema),
  shopController.updateShop
);

export default shopRouter;
