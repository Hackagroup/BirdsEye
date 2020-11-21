// Load environment variables
require('dotenv-safe').config({
  allowEmptyValues: true,
})

const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const logger = require('./utils/logger')

// Allow cors in development
if (process.env.NODE_ENV === 'development') {
  app.use(cors())
}

// Compress all responses
app.use(compression())

// Parse the form data (application/x-www-form-urlencoded) and expose to req.body
app.use(bodyParser.urlencoded({ extended: true }))

// Parse the json data (application/json) and expose to req.body
app.use(bodyParser.json())

// Routes
app.use(routes)

app.get('/', (req, res) => {
  res.status(404).send('Welcome to Twittive!')
})

// Any undefined route
app.use((req, res, next) => {
  res.status(404).send('Page not found!')
})

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack)
  res.status(500).send('Internal server error!')
})

// Listen for requests
const server = app.listen(process.env.PORT, process.env.IP, () => {
  logger.info(`Server started on ${process.env.IP}:${process.env.PORT}`)
})

// Export server for testing
module.exports = server
