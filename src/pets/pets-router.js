const express = require('express')
const path = require('path')
const PetsService = require('./pets-service')
const {requireAuth} = require('../middleware/jwt-auth')

const petsRouter = express.Router()
const jsonParser = express.json()

petsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PetsService.getAllPets(knexInstance)
      .then(pets => {
        res.json(pets)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name, owner_id} = req.body
    const newPet = { name, owner_id }

    for (const [key, value] of Object.entries(newPet)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    PetsService.insertPet(
      req.app.get('db'),
      newPet
    )
      .then(pet => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${pet.id}`))
          .json(pet)
      })
      .catch(next)
  })

petsRouter
  .route('/:pet_id')
  .all((req, res, next) => {
    PetsService.getPetById(
      req.app.get('db'),
      req.params.pet_id
    )
      .then(pet => {
        if (!pet) {
          return res.status(404).json({
            error: { message: `Pet doesn't exist` }
          })
        }
        res.pet = pet
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.pet)
  })
  .delete((req, res, next) => {
    PetsService.deletePet(
      req.app.get('db'),
      req.params.pet_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { name, owner_id} = req.body
    const newPet = { name, owner_id }

    const numberOfValues = Object.values(newPet).filter(Boolean).length
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'name', or 'owner_id'`
        }
      })
    }

    NotesService.updateNote(
      req.app.get('db'),
      req.params.pet_id,
      newPet
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = petsRouter