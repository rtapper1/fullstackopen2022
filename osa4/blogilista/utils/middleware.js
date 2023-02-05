const errorHandler = (err, req, res, next) => {
  console.log(err.name, err.message)
  if (err.name === 'ValidationError') {
    res.status(400).json({error: err.message})
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({error: err.message})
  } else {
  res.status(400).send({error: err.message})
  }
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  } else {
    req.token = null
  }
  next()
}

module.exports = { errorHandler, tokenExtractor }