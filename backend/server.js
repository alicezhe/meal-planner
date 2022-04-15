const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const session = require('cookie-session')

const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('dist'))

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://alicehe:cis197@cluster0.vclos.mongodb.net/recipesdb?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
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
