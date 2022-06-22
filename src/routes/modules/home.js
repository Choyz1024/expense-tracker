const express = require('express')
const router = express.Router()

const Category = require('../../models/Category')
const Expense = require('../../models/Expense')

router.get('/', async (req, res) => {
  const categoryData = await Category.find()
    .lean()
    .sort('id')
    .catch((err) => console.log(err))

  const sort = req.query.sort
  const sortKey = sort ? { categoryId: sort } : {}
  const sortName = sort ? categoryData.find((category) => sort === category.id).name : '類別'

  const expenseData = await Expense.find(sortKey)
    .lean()
    .sort('date')
    .catch((err) => console.log(err))

  let totalAmount = 0
  if (expenseData) {
    expenseData.forEach((expense) => {
      expense.icon = categoryData.find((category) => expense.categoryId === category.id).icon
      totalAmount += expense.expense
    })
  }

  res.render('index', { sort, sortName, categoryData, expenseData, totalAmount })
})

module.exports = router
