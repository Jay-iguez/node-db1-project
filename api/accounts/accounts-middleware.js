const Data = require('../accounts/accounts-model')

const checkTypeOf = (value, type) => {
  return typeof value === type ? true : false
}

const createError = (msg, status) => {
  const error = new Error(msg)
  error.status = status
  return error
}

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body

  if (name === undefined || budget === undefined) {
    const error = createError('name and budget are required', 400)
    next(error)
  }

  const trimmedName = name.trim()

  if (trimmedName.length < 3 || trimmedName.length > 100) {
    const error = createError('name of account must be between 3 and 100', 400)
    next(error)
  } else if (!(parseInt(budget))) {
    const error = createError('budget of account must be a number', 400)
    next(error)
  } else if (budget < 0 || budget > 1000000) {
    const error = createError('budget of account is too large or too small', 400)
    next(error)
  } else if (checkTypeOf(trimmedName, 'string') && checkTypeOf(budget, 'number')) {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { name } = req.body
  const accounts = await Data.getAll()

  const [filteredName] = accounts.filter(account => {
    if (account.name === name) {
      const error = createError('that name is taken', 400)
      next(error)
    }
  })

  next()
}

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params

  const account = await Data.getById(id)

  if (!account) {
    const error = new Error(`account not found`)
    error.status = 404
    next(error)
  } else {
    next()
  }
}

