const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
    name: String,
    description: String,
    completed: Boolean,
    image: String,  
})

let TodoModel = mongoose.model('todo', TodoSchema)

module.exports = TodoModel;