const express = require('express');
const router = require('express').Router();
const Todo = require('../model/todo')


router.get('/todos', async (req, res) => {
    console.log('routerget')
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


router.post('/todos', async (req, res) => {
    console.log('post hitted')
    const todo = new Todo({
      description: req.body.description,
    });
  
    try {
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.patch('/todos/:id', getTodo, async (req, res) => {
    console.log('updataed')
    if (req.body.completed != null) {
      res.todo.completed = req.body.completed;
    }
  
    try {
      const updatedTodo = await res.todo.save();
      res.json(updatedTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// router.delete('/todos/:id', getTodo, async (req, res) => {
//     console.log('todo deleted')
//     try {
//       await res.todo.remove();
//       res.json({ message: 'Deleted Todo' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
router.delete('/todos/:id', async (req, res) => {
    console.log('new delete')
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (todo) {
        res.json({ message: 'Deleted Todo' });
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  });
  async function getTodo(req, res, next) {
    let todo;
  
    try {
      todo = await Todo.findById(req.params.id);
  
      if (todo == null) {
        return res.status(404).json({ message: 'Cannot find Todo' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.todo = todo;
    next();
  }

module.exports = router;