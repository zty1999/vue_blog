const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
    
  },
});
