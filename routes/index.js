const express = require('express')
const router = express.Router()

// For all routes: `/login/<>`
router.use('/login', require('./login/'))

// For all routes: `/user/<>`
router.use('/user', require('./user/'))

// For all routes: `/tweet/<>`
router.use('/tweet', require('./tweet/'))

module.exports = router
