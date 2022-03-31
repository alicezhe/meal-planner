const express = require('express')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

const User = require('../models/user')

router.get('/recipes/saved', isAuthenticated, async (req, res, next) => {
  try {
    const { recipes } = await User.findOne({ username: req.session.username })
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

router.post('/recipes/checksaved', isAuthenticated, async (req, res, next) => {
  const { id } = req.body

  try {
    const recipes = await User.find({ username: req.session.username, recipes: { $all: [id] }})
    res.send(recipes.length !== 0)
  } catch (err) {
    next(err)
  }
})

router.post('/recipes/save', isAuthenticated, async (req, res, next) => {
  const { id } = req.body

  try {
    await User.updateOne({ username: req.session.username }, { $push: { recipes: id }})
    res.send('User has successfully saved recipe.')
  } catch (err) {
    next(err)
  }
})

router.post('/recipes/unsave', isAuthenticated, async (req, res, next) => {
  const { id } = req.body

  try {
    const data = await User.updateOne({ username: req.session.username }, { $pull: { recipes : { $in: [id] }}})
    res.send('User has successfully unsaved recipe.')
  } catch (err) {
    next(err)
  }
})

module.exports = router