import mongoose, { Schema } from "mongoose";

import { product } from "../product/productModel.js";

const shop = new Schema(
  {
    shopName: {
      type: String,
      required: [true, "Shop name is required"],
      unique: true,
    },
    shopOwnerName: {
      type: String,
      required: [true, "Shop owner name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    address: {
      type: String,
      required: [true, "Street address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    postal: {
      type: String,
      required: [true, "Zip / Postal is required"],
    },
    hasDeliverySystem: {
      type: Boolean,
      required: [true, "Delivery system existance is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    products: [product],
  },
  { versionKey: false }
);

const Shop = mongoose.model("shop", shop);

export default Shop;
