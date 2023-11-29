const db = require('../../data/db-config')

const getAll = async () => {
  const result = await db('accounts')
  return result
}

const getById = async id => {
  const [result] = await db('accounts').where('id', id)
  return result
}

const create = async account => {
  const [id] = await db('accounts').insert(account)
  const result = await getById(id)
  return result
}

const updateById = async (id, account) => {
  await db('accounts').update(account).where('id', id)
  const result = await getById(id)
  return result
}

const deleteById = async id => {
  const [accountToDelete] = await db('accounts').where('id', id)
  await db('accounts').del().where('id', id)
  return accountToDelete
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
