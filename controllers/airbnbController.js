/******************************************************************************
***
* ITE5315 – Assignment 4
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Frin Sureshbhai Patel Student ID: N01680041 Date: Nov 19,2025
*
*
******************************************************************************
**/


const Listing = require("../models/airbnb");

// GET ALL LISTINGS
exports.getAll = async (req, res, next) => {
  try {
    const {
      minPrice,
      maxPrice,
      neighbourhood,
      roomType,
      sortBy = "createdAt",
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    // Price filter
    if (minPrice || maxPrice) {
      filter["price"] = {};
      if (minPrice) filter["price"].$gte = Number(minPrice);
      if (maxPrice) filter["price"].$lte = Number(maxPrice);
    }

    // Neighbourhood filter
    if (neighbourhood) {
      filter["location.neighbourhood"] = neighbourhood;
    }

    // Room type filter
    if (roomType) {
      filter["details.roomType"] = roomType;
    }

    // Query listings
    const listings = await Listing.find(filter)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    res.status(200).json({
      page,
      limit,
      count: listings.length,
      data: listings
    });
  } catch (err) {
    next(err);
  }
};

// GET ONE LISTING (by id from dataset)
exports.getOne = async (req, res, next) => {
  try {
    const listing = await Listing.findOne({ id: req.params.id }).lean();

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (err) {
    next(err);
  }
};

// CREATE LISTING
exports.create = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

// UPDATE LISTING (by dataset id)
exports.update = async (req, res, next) => {
  try {
    const listing = await Listing.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (err) {
    next(err);
  }
};


// DELETE LISTING (by dataset id)
exports.remove = async (req, res, next) => {
  try {
    const listing = await Listing.findOneAndDelete({ id: req.params.id });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};