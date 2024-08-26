// src/routes/todo.routes.js
const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controllers");


router.post("/", todoController.create);

// Retrieve all Todos
router.get("/", todoController.findAll);

// Retrieve a single Todo by ID
router.get("/:id", todoController.findOne);

// Update a Todo by ID
router.put("/:id", todoController.update);

// Delete a Todo by ID
router.delete("/:id", todoController.delete);

module.exports = router;
