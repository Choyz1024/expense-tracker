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

  await Expense.create(expenseList)

  console.log('Database seeding completed successfully.')
  db.close()
  process.exit()
})
