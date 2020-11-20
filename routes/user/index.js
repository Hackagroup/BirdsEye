const express = require('express')
const router = express.Router()
const logger = require('../../utils/logger')
const getTwitterClient = require('../../utils/getTwitterClient')

/*
  @route: POST /user/:userid
  @desc: Fetch user information using user id
  @access: private
  @return (success): user information
*/

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const client = getTwitterClient(req)
    // 
    // Fetch user data from twitter api here
    // 
  } catch (err) {
    logger.error(err.stack ? err.stack : JSON.stringify(err))
    return res.status(400).json({
      message: 'Unknown error occurred!',
    })
  }
})

module.exports = router
