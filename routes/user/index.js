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

router.get('/', async (req, res) => {
  try {
    const client = getTwitterClient(req)
    const { userId } = req.params
    const { Name, screen_name, user_id } = req.query
    client.get(
      'users/show',
      { Name: Name,
        screen_name: screen_name,
        user_id: user_id
      },
      function (err, users, response) {
        try {
          if (err) throw err
          return res.status(200).json({ users })
        } catch (err) {
          logger.error(err.stack ? err.stack : JSON.stringify(err))
          return res.status(400).json({
            message: 'Unknown error occurred!',
          })
        }
      }
    )
  } catch (err) {
    logger.error(err.stack ? err.stack : JSON.stringify(err))
    return res.status(400).json({
      message: 'Unknown error occurred!',
    })
  }
})

module.exports = router
