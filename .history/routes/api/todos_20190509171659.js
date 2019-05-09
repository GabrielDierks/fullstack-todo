const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// Todos model
const Todo = require("../../models/Todo")

// @route   GET api/todos/test
// @desc    Tests todos route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "todos route works" }))

// @route   GET api/todos
// @desc    Get todos
// @access  Public
router.get("/", (req, res) => {
  Todo.find()
    .sort({ date: -1 })
    .then(todos => res.json(todos))
    .catch(err =>
      res.status(404).json({
        notodosfound: "There are no posts, be the first to post something!"
      })
    )
})

// @route   POST api/todos
// @desc    Create Todo
// @access  Public
router.post("/", (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  const newTodo = new Todo({
    title: req.body.text,
    text: req.body.name
  })
  newTodo.save().then(todo => res.json(todo))
})

// @route   DELETE api/post/:id
// @desc    Delete post
// @access  Private

router.delete("/:id", (req, res) => {
  post
    .remove()
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ todonotfound: "No todo found" }))
})

module.exports = router