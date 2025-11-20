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


// const mongoose = require("mongoose");

// const listingSchema = new mongoose.Schema(
//   {
//     listingId: { type: String, required: true, unique: true },

//     name: String,

//     host: {
//       hostId: String,
//       name: String,
//       identityVerified: {
//         type: Boolean,
//         default: false
//       },
//       totalListings: Number
//     },

//     location: {
//       neighbourhoodGroup: String,
//       neighbourhood: String,
//       country: String,
//       countryCode: String,
//       coordinates: {
//         type: { type: String, enum: ["Point"], default: "Point" },
//         coordinates: { type: [Number], index: "2dsphere" }
//       }
//     },

//     details: {
//       roomType: String,
//       propertyType: String,
//       constructionYear: Number,
//       minimumNights: Number,
//       houseRules: String,
//       license: String
//     },

//     pricing: {
//       price: String,
//       serviceFee: String,
//       currency: { type: String, default: "USD" }
//     },

//     booking: {
//       instantBookable: Boolean,
//       cancellationPolicy: String,
//       availability365: Number
//     },

//     reviews: {
//       numberOfReviews: Number,
//       lastReview: Date,
//       reviewsPerMonth: Number,
//       rating: Number
//     },

//     images: {
//       thumbnail: String,
//       gallery: [String]
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// // IMPORTANT FIX HERE: specify correct collection name
// module.exports = mongoose.model("Listing", listingSchema, "Airbnb_Listings");

const mongoose = require("mongoose");

const AirbnbSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },

    NAME: String,

    "host id": String,
    "host_identity_verified": String,
    "host name": String,

    "neighbourhood group": String,
    neighbourhood: String,

    lat: String,
    long: String,

    country: String,
    "country code": String,

    instant_bookable: String,
    cancellation_policy: String,

    "room type": String,
    "Construction year": String,

    price: String,
    "service fee": String,

    "minimum nights": String,
    "number of reviews": String,

    "last review": String,
    "reviews per month": String,

    "review rate number": String,
    "calculated host listings count": String,

    "availability 365": String,

    house_rules: String,
    license: String,

    property_type: String,

    thumbnail: String,
    images: [String]
  },
  {
    collection: "Airbnb_Listings",
    strict: false
  }
);

module.exports = mongoose.model("Airbnb", AirbnbSchema);