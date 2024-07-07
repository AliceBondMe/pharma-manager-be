import express from "express";

import authenticate from "../middlewares/authenticate.js";
import statisticsController from "./statisticsController.js";
import checkId from "../middlewares/checkId.js";

const statisticsRouter = express.Router();

statisticsRouter.get(
  "/:id",
  authenticate,
  checkId,
  statisticsController.getStats
);

export default statisticsRouter;
