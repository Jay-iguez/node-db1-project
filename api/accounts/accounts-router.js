const router = require('express').Router()
const Data = require('./accounts-model')
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('../accounts/accounts-middleware')

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

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params
    const account = await Data.getById(id)
    res.status(200).json(account)

  } catch (err) {
    res.locals.errmessage = "Error in getting id of " + req.params.id + "!"
    err.status = 500
    next(err)
  }
})

router.post('/', [checkAccountNameUnique, checkAccountPayload] , async (req, res, next) => {
  try {
    const { name, budget } = req.body
    const body = {name: name.trim(), budget: budget}
    const newAccount = await Data.create(body)
    res.status(201).json(newAccount)
  } catch (err) {
    res.locals.errmessage = "Error in creating new account!"
    err.status = 500
    next(err)
  }
})

router.put('/:id', [checkAccountId, checkAccountPayload], async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, budget } = req.body
    const body = {name: name.trim(), budget: budget}
    const updatedAccount = await Data.updateById(id, body)
    res.status(200).json(updatedAccount)
  } catch (err) {
    res.locals.errmessage = `Error in updating account of id ${req.params.id}!`
    err.status = 500
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedAccount = await Data.deleteById(id)
    res.status(200).json(deletedAccount)
  } catch (err) {
    res.locals.errmessage = `Error in deleting account of id ${req.params.id}`
    err.status = 500
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: `[${res.locals.error || "Middleware error"}]: ${err.message}`
  })
})

module.exports = router;
