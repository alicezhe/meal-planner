const isAuthenticated = (req, res, next) => {
  if (req.session.username && req.session.username !== 0) {
    next()
  } else {
    next(new Error('Not logged in.'))
  }
}

module.exports = isAuthenticated
