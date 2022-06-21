const express = require('express')
const router = express.Router()

const Category = require('../../models/Category')

router.get('/', (req, res) => {
  Category.find({})
    .lean()
    .sort('id')
    .then((categoryData) => res.render('index', { categoryData }))
    .catch((err) => console.log(err))
})

module.exports = router
