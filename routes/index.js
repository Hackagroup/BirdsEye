const express = require('express')
const router = express.Router()

// For all routes: `/login/<>`
router.use('/login', require('./login/'))

// For all routes: `/search/<>`
router.use('/search', require('./search/'))

// For all routes: `/post/<>`
router.use('/post', require('./post/'))

module.exports = router
