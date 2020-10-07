const mongoose = require('mongoose')
const usersSchema = require('../schemas/adminuser')
 
module.exports = mongoose.model('AdminUser', usersSchema)
 