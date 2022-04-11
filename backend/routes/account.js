const express = require('express')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

const User = require('../models/user')
const Plan = require('../models/plan')

router.get('/users', async (req, res, next) => {
  try {
    const questions = await User.find()
    res.json(questions)
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  const { username, password, name } = req.body

  try {
    await User.create({ username, password, name })

    req.session.fname = name.fname
    req.session.username = username
    req.session.password = password

    const data = await Plan.create({ username: req.session.username })
    console.log(data)

    res.send('User has signed up successfully.')
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (!user) {
      res.send('User does not exist')
    } else {
      const { password: passDB, name } = user
      if (password === passDB) {
        req.session.fname = name.fname
        req.session.username = username
        req.session.password = password
        res.send('User has logged in successfully.')
      } else {
        res.send('User credentials are wrong.')
      }
    }
  } catch (err) {
    next(err)
  }
})

router.post('/logout', isAuthenticated, (req, res, next) => {
  req.session.fname = null
  req.session.username = null
  req.session.password = null
  res.send('User has logged out.')
})

router.get('/isLoggedIn', (req, res, next) => {
  res.send(req.session.fname)
})

router.post('/deleteall', async (req, res, next) => {
  try {
    await User.deleteMany({})
    res.send('Deleted all users.')
  } catch (err) {
    next(err)
  }
})

router.post('/deleteone', async (req, res, next) => {
  const { username } = req.body
  try {
    await User.deleteOne({ username: username })
    res.send('Deleted one user.')
  } catch (err) {
    next(err)
  }
})

module.exports = router
