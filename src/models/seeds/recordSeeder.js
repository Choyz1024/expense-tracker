const Expense = require('../Expense')
const expenseList = require('./expense.json').results

const USER_LIST = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678',
  },
  {
    name: '美冴',
    email: 'user2@example.com',
    password: '12345678',
  },
]

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', async () => {
  console.log('Seeding: expenseSeeder ... ')

  USER_LIST.map(async (user) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    console.log(hash)
  })

  console.log('Database seeding completed successfully.')
  db.close()
  process.exit()
})
