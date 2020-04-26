const router = require('express').Router()
const auth = require('../../middleware/auth')
const db = require('../../db/models')

router.get('/', auth, async (req, res) => {
  try {
    const searches = await db.UserSearches.findAll()
    res.status(200).json(searches)
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const search = await db.UserSearches.create(req.body)
    res.status(201).json(search)
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const search = await db.UserSearches.findOne({ where: { id } })
    if (!search) {
      return res.status(404).send()
    }
    res.status(200).json(search)
  } catch (error) {
    res.status(500).send()
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    await db.UserSearches.destroy({ where: { id } })
    res.status(204).end()
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
