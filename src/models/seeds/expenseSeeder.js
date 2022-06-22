const Category = require('../Category')
const Expense = require('../Expense')
const expenseList = require('./expense.json').results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', async () => {
  console.log('Seeding: expenseSeeder ... ')

  const categoryData = await Category.find()
  expenseList.forEach((expense) => {
    expense.categoryId = categoryData.find(category => category.id === expense.category)._id
  })
  await Expense.create(expenseList)

  console.log('Database seeding completed successfully.')
  db.close()
  process.exit()
})
