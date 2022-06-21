const Category = require('../Category')
const categoryList = require('./category.json').results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', async () => {

  console.log('Seeding: categorySeeder ... ')

  await Category.create(categoryList)

  console.log('Database seeding completed successfully.')

  db.close()
  process.exit()
})
