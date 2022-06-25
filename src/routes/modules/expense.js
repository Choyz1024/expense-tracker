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
  newExpense.userId = req.user._id
  Expense.create(newExpense)
  res.redirect('/')
})

router.get('/:expenseId/edit', async (req, res) => {
  //取得edit前index是否有依類別查詢的狀態
  const query = req.header('Referer').substr(-1)
  const sort = query !== '/' ? query : ''

  const userId = req.user._id
  const _id = req.params.expenseId
  const categoryData = await Category.find()
    .lean()
    .sort('id')
    .catch((err) => console.log(err))
  const expense = await Expense.findOne({ _id, userId })
    .lean()
    .catch((err) => console.log(err))
  expense.categoryName = categoryData.find((category) => category.id === expense.categoryId).name
  res.render('expense', { categoryData, expense, sort })
})

router.put('/:expenseId', (req, res) => {
  //設定edit後redirect的網址
  let sort = req.body.sort
  if (sort) sort = req.body.categoryId

  const redirectUrl = sort ? '/?sort=' + sort : '/'
  const userId = req.user._id
  const _id = req.params.expenseId
  Expense.updateOne({ _id, userId }, req.body)
    .then(() => res.redirect(redirectUrl))
    .catch((err) => console.log(err))
})

router.delete('/:expenseId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.expenseId
  Expense.deleteOne({ _id, userId })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router
