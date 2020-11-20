const express = require('express')
const router = express.Router()

// For all routes: `/login/<>`
router.use('/login', require('./login/'))

// For all routes: `/search/<>`
router.use('/search', require('./search/'))

module.exports = router
