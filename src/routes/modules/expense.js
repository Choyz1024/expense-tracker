const express = require('express')
const router = express.Router()

const Category = require('../../models/Category')
const Expense = require('../../models/Expense')

router.get('/new', (req, res) => {
  Category.find({})
    .lean()
    .sort('id')
    .then((categoryData) => res.render('expense', { categoryData }))
    .catch((err) => console.log(err))
})

router.post('/', (req, res) => {
  const newExpense = req.body
  Expense.create(newExpense)
  res.redirect('/')
})

router.get('/:expenseId/edit', async (req, res) => {
  const _id = req.params.expenseId
  const categoryData = await Category.find()
    .lean()
    .sort('id')
    .catch((err) => console.log(err))
  const expense = await Expense.findOne({ _id })
    .lean()
    .catch((err) => console.log(err))
  expense.categoryName = categoryData.find((category) => category.id === expense.categoryId).name
  res.render('expense', { categoryData, expense })
})

router.put('/:expenseId', (req, res) => {
  const _id = req.params.expenseId
  Expense.findOneAndUpdate({ _id }, req.body)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router
