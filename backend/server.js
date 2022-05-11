const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const session = require('cookie-session')
require('dotenv').config()

const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('dist'))

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))

app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['pineapple'],
}))

app.use('/account', accountRouter)
app.use('/api', apiRouter)

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.use((err, req, res, next) => res.send(`ERROR: ${err.message}`))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
