const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: Number,
    ref: 'Category',
    index: true,
    required: true,
  },
})

module.exports = mongoose.model('Expense', expenseSchema)