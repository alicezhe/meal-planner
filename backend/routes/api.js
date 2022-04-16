const express = require('express')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

const User = require('../models/User')
const Plan = require('../models/Plan')

router.get('/recipes/saved', isAuthenticated, async (req, res, next) => {
  try {
    const { recipes } = await User.findOne({ username: req.session.username })
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

router.get('/recipes/checksaved/:id', isAuthenticated, async (req, res, next) => {
  try {
    const recipes = await User.find({ username: { $eq: req.session.username }, recipes: { $all: [parseInt(req.params.id, 10)] } })
    res.send(recipes.length !== 0)
  } catch (err) {
    next(err)
  }
})

router.post('/recipes/save', isAuthenticated, async (req, res, next) => {
  const { id } = req.body

  try {
    await User.updateOne({ username: req.session.username }, { $addToSet: { recipes: parseInt(id, 10) } })
    res.send('User has successfully saved recipe.')
  } catch (err) {
    next(err)
  }
})

router.post('/recipes/unsave', isAuthenticated, async (req, res, next) => {
  const { id } = req.body

  try {
    const data = await User.updateOne({ username: req.session.username }, { $pull: { recipes: { $in: [parseInt(id, 10)] } } })
    res.send('User has successfully unsaved recipe.')
  } catch (err) {
    next(err)
  }
})

router.post('/plan/create', async (req, res, next) => {
  const { username } = req.body

  try {
    await Plan.create({ username })
    res.json('User has successfully created a meal plan.')
  } catch (err) {
    next(err)
  }
})

router.get('/plan/', async (req, res, next) => {
  try {
    const data = await Plan.findOne({ username: req.session.username })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/plan/add', isAuthenticated, async (req, res, next) => {
  const { id, title, image, day, time } = req.body

  const dayLower = day.toLowerCase()
  const timeLower = time.toLowerCase()

  if (!['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(dayLower)) {
    res.send('Inputted day is not valid.')
  } else if (!['breakfast', 'lunch', 'dinner', 'other'].includes(timeLower)) {
    res.send('Inputted time is not valid.')
  }

  const query = {}
  query[`plan.${dayLower}.${timeLower}`] = { mealId: id, title, image }

  try {
    const response = await Plan.updateOne({ username: req.session.username }, { $set: query })
    res.send('User has successfully added recipe to plan.')
  } catch (err) {
    next(err)
  }
})

router.post('/plan/delete', isAuthenticated, async (req, res, next) => {
  const { mealId, day, time, title, image} = req.body

  const query = {}
  query[`plan.${day}.${time}`] = { mealId, title, image }

  try {
    await Plan.updateOne({ username: req.session.username }, { $pull: query })
    res.send('User has successfully deleted recipe from plan.')
  } catch (err) {
    next(err)
  }
})

module.exports = router
