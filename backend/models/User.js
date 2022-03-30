const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  recipes: { type: Array },
  name: {
    fname: { type: String, required: true},
    lname: { type: String, required: true }
  }
})

module.exports = model('User', userSchema)
