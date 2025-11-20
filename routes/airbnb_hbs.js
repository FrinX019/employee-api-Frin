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


const express = require("express");
const router = express.Router();
const Listing = require("../models/airbnb");

// HOME PAGE
router.get("/", (req, res) => {
  res.render("home");
});

// SHOW ALL LISTINGS
// router.get("/list", async (req, res, next) => {
//   try {
//     const listings = await Listing.find().limit(10).lean();
//     res.render("allListings", { listings });
//   } catch (err) {
//     next(err);
//   }
// });
// ===============================
router.get("/list", async (req, res, next) => {
  try {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1;

    const totalListings = await Listing.countDocuments();
    const listings = await Listing.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();

    res.render("allListings", {
      listings,
      currentPage: page,
      hasNextPage: page * perPage < totalListings,
      hasPreviousPage: page > 1
    });

  } catch (err) {
    next(err);
  }
});

// VIEW SINGLE LISTING
router.get("/view/:id", async (req, res, next) => {
  try {
    const listing = await Listing.findOne({ id: req.params.id }).lean();
    res.render("singleListing", { listing });
  } catch (err) {
    next(err);
  }
});

// ADD LISTING (FORM PAGE)
router.get("/add", (req, res) => {
  res.render("addListing");
});

// SUBMIT NEW LISTING
router.post("/add", async (req, res, next) => {
  try {
    await Listing.create(req.body);
    res.redirect("/airbnb_hbs/list");
  } catch (err) {
    next(err);
  }
});


// ADVANCED SEARCH (ID or NAME)
router.get("/search", async (req, res, next) => {
  try {
    const method = req.query.method;   // id or name
    const value = req.query.value;     // user input

    // If nothing selected → show empty page
    if (!method || !value) {
      return res.render("searchListing", { method });
    }

    let listing = null;

    if (method === "id") {
      listing = await Listing.findOne({ id: value }).lean();
    } else if (method === "name") {
      listing = await Listing.findOne({ NAME: value }).lean();
    }

    res.render("searchListing", { method, value, listing });

  } catch (err) {
    next(err);
  }
});

// UPDATE LISTING – SEARCH PAGE
router.get("/update", async (req, res, next) => {
  try {
    const queryId = req.query.id;

    if (!queryId) {
      return res.render("updateListing");
    }

    const listing = await Listing.findOne({ id: queryId }).lean();
    res.render("updateListing", { listing, queryId });

  } catch (err) {
    next(err);
  }
});

// UPDATE LISTING SUBMIT
router.post("/update/:id", async (req, res, next) => {
  try {
    if (req.body.price) {
  // Remove everything except digits
  const numeric = req.body.price.toString().replace(/\D/g, "");

  // Format final value with $ prefix
  req.body.price = `$${numeric}`;
}

    await Listing.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    res.redirect(`/airbnb_hbs/view/${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

// DELETE LISTING – SEARCH PAGE
router.get("/delete", async (req, res, next) => {
  try {
    const queryId = req.query.id;

    if (!queryId) {
      return res.render("deleteListing");
    }

    const listing = await Listing.findOne({ id: queryId }).lean();
    res.render("deleteListing", { listing, queryId });

  } catch (err) {
    next(err);
  }
});

// DELETE LISTING SUBMIT
router.post("/delete/:id", async (req, res, next) => {
  try {
    await Listing.findOneAndDelete({ id: req.params.id });
    res.redirect("/airbnb_hbs/list");
  } catch (err) {
    next(err);
  }
});

module.exports = router;