import mongoose from "mongoose";
import HttpError from "../helpers/HttpError.js";
import { Product } from "../product/productModel.js";
import Shop from "./shopModel.js";

const createShop = async (shopInfo, owner) => {
  const shopToAdd = await Shop.create({ ...shopInfo, owner });
  return shopToAdd;
};

const getShopsByOwner = async (owner) => {
  const shops = await Shop.find().where("owner").equals(owner);

  if (!shops) throw HttpError(404);
  return shops;
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

const deleteShop = async (id, owner) => {
  const deletedShop = await Shop.findByIdAndDelete(id)
    .where("owner")
    .equals(owner);

  if (!deletedShop) throw HttpError(404);
  return;
};

const addProduct = async (id, owner, newProduct) => {
  const product = new Product(newProduct);
  const savedProduct = await product.save();

  const updatedShop = await Shop.findByIdAndUpdate(
    id,
    { $push: { products: savedProduct } },
    { new: true }
  )
    .where("owner")
    .equals(owner);

  if (!updatedShop) throw HttpError(404, "Shop not found");

  return savedProduct;
};

const addProductById = async (shopId, productId, owner) => {
  if (
    !mongoose.Types.ObjectId.isValid(shopId) ||
    !mongoose.Types.ObjectId.isValid(productId)
  )
    throw HttpError(400, "Invalid shop ID or product ID");

  const product = await Product.findById(productId);
  if (!product) throw HttpError(404, "Product not found");

  const shop = await Shop.findOne({ _id: shopId, owner });
  if (!shop) throw HttpError(404, "Shop not found or unauthorized");

  const productInShop = shop.products.find(
    (p) => p._id.toString() === productId
  );
  if (productInShop) throw HttpError(400, "Product is already in the shop");

  await Shop.findByIdAndUpdate(
    shopId,
    { $push: { products: product } },
    { new: true }
  )
    .where("owner")
    .equals(owner);

  return product;
};

const editProductById = async (shopId, productId, owner, editedProduct) => {
  if (
    !mongoose.Types.ObjectId.isValid(shopId) ||
    !mongoose.Types.ObjectId.isValid(productId)
  )
    throw HttpError(400, "Invalid shop ID or product ID");

  const shop = await Shop.findOne({ _id: shopId, owner });
  if (!shop) throw HttpError(404, "Shop not found or unauthorized");

  const productIndex = shop.products.findIndex(
    (p) => p._id.toString() === productId
  );
  if (productIndex === -1)
    throw HttpError(404, "Product not found in the shop");

  const productInShop = shop.products[productIndex];
  Object.keys(editedProduct).forEach((key) => {
    productInShop[key] = editedProduct[key];
  });

  await shop.save();

  return productInShop;
};

const deleteProductById = async (shopId, productId, owner) => {
  if (
    !mongoose.Types.ObjectId.isValid(shopId) ||
    !mongoose.Types.ObjectId.isValid(productId)
  )
    throw HttpError(400, "Invalid shop ID or product ID");

  const shop = await Shop.findOne({ _id: shopId, owner });
  if (!shop) throw HttpError(404, "Shop not found or unauthorized");

  const productIndex = shop.products.findIndex(
    (p) => p._id.toString() === productId
  );
  if (productIndex === -1)
    throw HttpError(404, "Product not found in the shop");

  shop.products.splice(productIndex, 1);

  await shop.save();
  return;
};

export default {
  createShop,
  getShopsByOwner,
  getOneShop,
  updateShop,
  deleteShop,
  addProduct,
  addProductById,
  editProductById,
  deleteProductById,
};
