const express = require('express')
const path = require('path')
const CustomersService = require('./customers-service')
const {requireAuth} = require('../middleware/jwt-auth')

const customersRouter = express.Router()
const jsonParser = express.json()

customersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    CustomersService.getAllCustomers(knexInstance)
      .then(customers => {
        res.json(customers)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const {name, phone, pets} = req.body
    const newCustomer = {name, phone, pets}

    for (const [key, value] of Object.entries(newCustomer)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    CustomersService.insertCustomer(
      req.app.get('db'),
      newCustomer
    )
      .then(customer => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${customer.id}`))
          .json(customer)
      })
      .catch(next)
  })

customersRouter
  .route('/:customer_id')
  //.all(requireAuth)
  .all((req, res, next) => {
    CustomersService.getCustomerById(
      req.app.get('db'),
      req.params.customer_id
    )
      .then(customer => {
        if (!customer) {
          return res.status(404).json({
            error: { message: `Customer doesn't exist` }
          })
        }
        res.customer = customer
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.customer)
  })
  .delete((req, res, next) => {
    CustomersService.deleteCustomer(
      req.app.get('db'),
      req.params.customer_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

customersRouter.route('/:customer_id/pets/')
  //.all(requireAuth)
  .get((req, res, next) => {
    CustomersService.getPetsForCustomer(
      req.app.get('db'),
      req.params.customer_id
    )
      .then(pets => {
        res.json(pets.map(CustomersService.serializeCustomerPets))
      })
      .catch(next)
  })

module.exports = customersRouter