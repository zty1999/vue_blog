const mongoose = require('mongoose')
const articlesSchema = require('../schemas/article')
 
module.exports = mongoose.model('Article', articlesSchema)