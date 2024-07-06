import { Types } from "mongoose";

import HttpError from "../helpers/HttpError.js";

const checkId = (req, res, next) => {
  const id = req.params.id;
  const isIdValid = Types.ObjectId.isValid(id);

  if (!isIdValid) {
    return next(HttpError(400, "Item doesn`t exist"));
  }

  next();
};

export default checkId;
