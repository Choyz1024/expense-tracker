const express = require('express')
const router = express.Router()

const Category = require('../../models/Category')

router.get('/new', (req, res) => {
  Category.find({})
    .lean()
    .sort('id')
    .then((categoryData) => res.render('expense', { categoryData }))
    .catch((err) => console.log(err))
})

router.post('/', (req, res) => {
  const newExpense = req.body
  console.log(newExpense)
  //TODO: Create new expense to DB
  res.redirect('/expense/new')
})

module.exports = router