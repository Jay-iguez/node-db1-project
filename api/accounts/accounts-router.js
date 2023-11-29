const router = require('express').Router()
const Data = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Data.getAll()
    console.log(accounts)
    res.status(200).json(accounts)
  } catch (err) {
    res.locals.errmessage = "Error in fetching accounts!"
    err.status = 500
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: `[${res.locals.error || "Middleware error"}]: ${err.message}`
  })
})

module.exports = router;
