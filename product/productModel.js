import mongoose, { Schema } from "mongoose";

export const product = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    suppliers: {
      type: String,
      required: [true, "Supplier is required"],
    },
    stock: {
      type: String,
      required: [false],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    photo: {
      type: String,
    },
    reviews: [
      {
        name: {
          type: String,
        },
        date: {
          type: Date,
        },
        review: {
          type: String,
        },
      },
    ],
  },
  { versionKey: false }
);

export const Product = mongoose.model("product", product);
