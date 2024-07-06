import HttpError from "../helpers/HttpError.js";
import Shop from "./shopModel.js";

const createShop = async (shopInfo, owner) => {
  const shopToAdd = await Shop.create({ ...shopInfo, owner });
  return shopToAdd;
};

const getOneShop = async (id, owner) => {
  const shop = await Shop.findById(id).where("owner").equals(owner);

  if (!shop) throw HttpError(404);
  return shop;
};

const updateShop = async (id, owner, updates) => {
  const updatedShop = await Shop.findByIdAndUpdate(id, updates, {
    new: true,
  })
    .where("owner")
    .equals(owner);

  if (!updatedShop) throw HttpError(404);
  return updatedShop;
};

export default {
  createShop,
  getOneShop,
  updateShop,
};
