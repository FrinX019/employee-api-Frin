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

const Employee = require("../models/employee");

// GET ALL
exports.getAll = async (req, res, next) => {
  try {
    const { minSalary, maxSalary, department, sortBy="createdAt", page=1, limit=10 } = req.query;

    const filter = {};

    if (minSalary || maxSalary) {
      filter.salary = {};
      if (minSalary) filter.salary.$gte = Number(minSalary);
      if (maxSalary) filter.salary.$lte = Number(maxSalary);
    }

    if (department) filter.department = department;

    const employees = await Employee.find(filter)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    res.status(200).json({ page, limit, count: employees.length, data: employees });
  } catch (err) {
    next(err);
  }
};

// GET ONE
exports.getOne = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).lean();
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

// CREATE
exports.create = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.update = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

// DELETE (hard delete)
exports.remove = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};