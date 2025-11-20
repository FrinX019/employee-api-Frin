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
const controller = require("../controllers/employeeController");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;