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


const mongoose = require("mongoose");

const EmpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true
    },
    salary: {
      type: Number,
      required: true,
      min: 0
    },
    age: {
      type: Number,
      min: 16,
      max: 80,
      default: 25
    },
    department: {
      type: String,
      enum: ["HR", "IT", "Sales", "Finance"],
      default: "IT"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Employee", EmpSchema);