const express = require('express')
const router = express.Router()

// Import the userModel
const userModel = require('../models/user')

// GET /users - get all users
router.get('/users', async (req, res) => {
  const users = await userModel.getAll()
  res.json(users)
})

// GET /users/:id - get a specific user by ID
router.get('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const user = await userModel.getById(id)

  if (user) {
    res.json(user)
  } else {
    res.status(404).json( { error: 'User not found' } )
  }
})

// POST /users/login - authenticate user by email address and password
router.post('/users/login', async (req, res) => {
  const { emailaddress, password } = req.body
  const user = await userModel.getByEmail(emailaddress, password)

  if (user) {
    res.json(user)
  }
  else {
    res.status(401).json( { error: 'Invalid email or password'} )
  }
})

// POST /users - create a new user
router.post('/users', async (req, res) => {
  const user = req.body
  const newUser = await userModel.create(user)
  res.status(201).json(newUser)
})

module.exports = router