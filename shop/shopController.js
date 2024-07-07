import { trycatch } from "../helpers/trycatch.js";
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

  res.status(200).json(shop);
};

const updateShop = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const updates = req.body;

  const shop = await shopService.updateShop(id, owner, updates);

  res.status(200).json(shop);
};

const addProduct = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const newProduct = req.body;

  const product = await shopService.addProduct(id, owner, newProduct);

  res.status(200).json(product);
};

const addProductById = async (req, res) => {
  const { shopId, productId } = req.params;
  const { _id: owner } = req.user;

  const product = await shopService.addProductById(shopId, productId, owner);

  res.status(200).json(product);
};

const editProductById = async (req, res) => {
  const { shopId, productId } = req.params;
  const { _id: owner } = req.user;
  const editedProduct = req.body;

  const product = await shopService.editProductById(
    shopId,
    productId,
    owner,
    editedProduct
  );

  res.status(200).json(product);
};

const deleteProductById = async (req, res) => {
  const { shopId, productId } = req.params;
  const { _id: owner } = req.user;

  await shopService.deleteProductById(shopId, productId, owner);

  res.status(200).json({ message: "Product deleted succesfully" });
};

export default {
  createShop: trycatch(createShop),
  getOneShop: trycatch(getOneShop),
  updateShop: trycatch(updateShop),
  addProduct: trycatch(addProduct),
  addProductById: trycatch(addProductById),
  editProductById: trycatch(editProductById),
  deleteProductById: trycatch(deleteProductById),
};
