import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "tested success" });
};

export const update = async (req, res, next) => {
  const userParamId = req.params.id;
  const userAuthId = req.user.id;
  if (userAuthId !== userParamId)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const destroy = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("Your account has been deleted... :(");
  } catch (error) {
    next(error);
  }
};

export const showUserListing = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(401, "User not found!");

    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
