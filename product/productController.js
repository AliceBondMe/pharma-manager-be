import { trycatch } from "../helpers/trycatch.js";
import productService from "./productService.js";

const getAllProducts = async (req, res) => {
  const allProducts = await productService.getAllProducts();

  res.status(200).json(allProducts);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getOneProduct(id);

  res.status(200).json(product);
};

export default {
  getAllProducts: trycatch(getAllProducts),
  getOneProduct: trycatch(getOneProduct),
};
