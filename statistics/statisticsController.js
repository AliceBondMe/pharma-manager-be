import { trycatch } from "../helpers/trycatch.js";
import statisticsService from "./statisticsService.js";

const getStats = async (req, res) => {
  const { id } = req.params;

  const stats = await statisticsService.getStats(id);

  res.status(200).json(stats);
};

export default {
  getStats: trycatch(getStats),
};
