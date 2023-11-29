const Data = require('../accounts/accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params

  const account = await Data.getById(id)

  if (!account) {
    const error = new Error(`Account of id ${id} does not exist!`)
    error.status = 404
    next(error)
  } else {
    next()
  }
} 

