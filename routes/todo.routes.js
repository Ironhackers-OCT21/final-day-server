const express = require('express')
const router = express.Router()

let TodoModel = require('../models/Todo.model')

// NOTE: All your API routes will start from /api 

// will handle all GET requests to http:localhost:5005/api/todos
router.get('/todos', (req, res) => {
     TodoModel.find()
          .then((todos) => {
               res.status(200).json(todos)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })         
})

// will handle all POST requests to http:localhost:5005/api/create
router.post('/create', (req, res) => {  
    const {name, description, completed, image} = req.body;
    console.log(req.body)
    TodoModel.create({name, description, completed, image})
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})

// will handle all GET requests to http:localhost:5005/api/todos/:todoId
//PS: Don't type :todoId , it's something dynamic, 
router.get('/todos/:todoId', (req, res) => {
    TodoModel.findById(req.params.todoId)
     .then((response) => {
          res.status(200).json(response)
     })
     .catch((err) => {
          res.status(500).json({
               error: 'Something went wrong',
               message: err
          })
     }) 
})

// will handle all DELETE requests to http:localhost:5005/api/todos/:id
router.delete('/todos/:id', (req, res) => {
    TodoModel.findByIdAndDelete(req.params.id)
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})

// will handle all PATCH requests to http:localhost:5005/api/todos/:id
router.patch('/todos/:id', (req, res) => {
    let id = req.params.id
    const {name, description, completed} = req.body;
    TodoModel.findByIdAndUpdate(id, {$set: {name: name, description: description, completed: completed}}, {new: true})
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          }) 
})

module.exports = router;