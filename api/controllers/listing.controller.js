import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      next(errorHandler(404, "Listing not found!"));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only delete your own listings!"));
    }

    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      listingName: deletedListing.name,
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

import mongoose from "mongoose";

// export const updateListing = async (req, res, next) => {
//   try {
//     const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
//     if (!isValidObjectId) {
//       return res.status(400).json({ error: "Invalid listing ID" });
//     }

//     const listing = await Listing.findById(req.params.id);
//     if (!listing) {
//       return res.status(404).json({ error: "Listing not found" });
//     }

//     // Rest of your code for authorization and updating the listing...

//     // Modify this section accordingly based on your application's logic.

//     const allowedFields = {
//       title: req.body.title,
//       description: req.body.description,
//       // Add other fields that can be updated
//     };

//     const updatedListing = await Listing.findByIdAndUpdate(
//       req.params.id,
//       allowedFields,
//       { new: true }
//     );

//     if (!updatedListing) {
//       return res.status(404).json({ error: "Listing not found" });
//     }

//     res.status(200).json(updatedListing);
//   } catch (error) {
//     next(error);
//   }
// };

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
