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

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only update your own listings!"));
    }

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

export const get = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found"));
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const {
      limit = 6,
      startIndex = 0,
      offer,
      furnished,
      parking,
      type,
      searchTerm = "",
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const queryOptions = {
      offer:
        offer === undefined || offer === "false"
          ? { $in: [true, false] }
          : offer === "true",
      furnished:
        furnished === undefined || furnished === "false"
          ? { $in: [true, false] }
          : furnished === "true",
      parking:
        parking === undefined || parking === "false"
          ? { $in: [true, false] }
          : parking === "true",
      type:
        type === undefined || type === "all" ? { $in: ["sale", "rent"] } : type,
    };

    let filter = {
      name: { $regex: searchTerm, $options: "i" },
      ...queryOptions,
    };

    const listings = await Listing.find(filter)
      .sort({ [sort]: order })
      .limit(parseInt(limit))
      .skip(parseInt(startIndex));

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
