require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')
const customerRouter = require('./customers/customer-router')
const petsRouter = require('./pets/pets-router')
const userRouter = require('./users/users-router')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test',
}))
app.use(helmet())
app.use(cors())


app.use('/api/customers', customerRouter);
app.use('/api/pets', petsRouter)
app.use('/api/users', userRouter)

app.get('/', (req,res)=> {
    res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'Server Error' } }
    } else {
        console.error(error)
        response = { error: error.message, object: error }
    }
    res.status(500).json(response)
})

module.exports = app