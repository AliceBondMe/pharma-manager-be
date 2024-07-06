import { trycatch } from "../helpers/trycatch.js";
import checkId from "../middlewares/checkId.js";
import shopService from "./shopService.js";

const createShop = async (req, res) => {
  const { _id: owner } = req.user;
  const shop = await shopService.createShop(req.body, owner);
  res.status(201).json(shop);
};

const getOneShop = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const shop = await shopService.getOneShop(id, owner);

  res.status(201).json(shop);
};

const updateShop = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const updates = req.body;

  const shop = await shopService.updateShop(id, owner, updates);

  res.status(201).json(shop);
};

export default {
  createShop: trycatch(createShop),
  getOneShop: trycatch(getOneShop),
  updateShop: trycatch(updateShop),
};
