const { Schema, model } = require('mongoose')

const planSchema = new Schema({
  username: { type: String, required: true, unique: true },
  plan: {
    monday: {
      breakfast: { type: Array },
      lunch: { type: Array },
      dinner: { type: Array },
      other: { type: Array },
    },
    tuesday: {
      breakfast: { type: Array },
      lunch: { type: Array },
      dinner: { type: Array },
      other: { type: Array },
    },
    wednesday: {
      breakfast: { type: Array },
      lunch: { type: Array },
      dinner: { type: Array },
      other: { type: Array },
    },
    thursday: {
      breakfast: { type: Array },
      lunch: { type: Array },
      dinner: { type: Array },
      other: { type: Array },
    },
    friday: {
      breakfast: { type: Array },
      lunch: { type: Array },
      dinner: { type: Array },
      other: { type: Array },
    },
    saturday: {
      breakfast: { type: Array },
      lunch: { type: Array },
      dinner: { type: Array },
      other: { type: Array },
    },
    sunday: {
      breakfast: { type: Array },
      lunch: { type: Array },
      dinner: { type: Array },
      other: { type: Array },
    },
  },
})

module.exports = model('Plan', planSchema)
