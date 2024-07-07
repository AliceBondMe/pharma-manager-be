import HttpError from "../helpers/HttpError.js";
import { Product } from "./productModel.js";

const getAllProducts = async () => {
  const allProducts = await Product.find();

  if (!allProducts) throw HttpError(404);
  return allProducts;
};

const getOneProduct = async (id) => {
  const product = await Product.findById(id);

  if (!product) throw HttpError(404);
  return product;
};

export default {
  getAllProducts,
  getOneProduct,
};
