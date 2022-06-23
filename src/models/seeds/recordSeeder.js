const User = require('../User')
const Expense = require('../Expense')
const expenseList = require('./expense.json').results

const USER_LIST = [
  {
    email: 'user1@example.com',
    password: '12345678',
    name: '廣志',
    type: 'email',
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    name: '美冴',
    type: 'email',
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
  console.log('Seeding: recordSeeder ... ')

  await Promise.all(
    USER_LIST.map(async (user, userIndex) => {
      user.password = await bcrypt.hash(user.password, 10)
      const createdUser = await User.create(user)
      await Promise.all(
        expenseList.map(async (expense) => {
          if (userIndex === parseInt(expense.id / 6)) {
            expense.userId = createdUser._id
            await Expense.create(expense)
          }
        })
      )
    })
  )

  console.log('Record seeding completed successfully.')
  db.close()
  process.exit()
})
