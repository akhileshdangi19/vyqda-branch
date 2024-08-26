// src/controllers/todo.controller.js
const db = require("../models");
const Todo = db.todo;

// Create a new Todo
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }

  const todo = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false,
  };

  Todo.create(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Todo.",
      });
    });
};

// Retrieve all Todos
exports.findAll = (req, res) => {
  Todo.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
};

// Find a single Todo by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Todo with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Todo with id=" + id,
      });
    });
};

// Update a Todo by ID
exports.update = (req, res) => {
  const id = req.params.id;

  Todo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Todo was updated successfully." });
      } else {
        res.send({ message: `Cannot update Todo with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating Todo with id=" + id });
    });
};

// Delete a Todo by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Todo was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Todo with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete Todo with id=" + id });
    });
};
