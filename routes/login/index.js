const express = require('express')
const router = express.Router()
const request = require('request')
const logger = require('../../utils/logger')

/*
  @route: POST /login/request_token
  @desc: Ask for request token from Twitter
  @access: public
  @return (success):
    {
      oauth_token: 'abcd',
      oauth_token_secret: 'edfg',
      oauth_callback_confirmed: 'true'
    }
*/
router.post('/request_token', async (req, res) => {
  try {
    request.post(
      {
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
          oauth_callback: encodeURIComponent('http://localhost:3000/twitter-callback'),
          consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
        },
      },
      function (err, response, body) {
        try {
          if (err) throw err
          return res
            .status(200)
            .json(JSON.parse('{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}'))
        } catch (err) {
          logger.error(err.stack)
          return res.status(400).json({
            message: 'Unknown error occurred!',
          })
        }
      }
    )
  } catch (err) {
    logger.error(err.stack)
    return res.status(400).json({
      message: 'Unknown error occurred!',
    })
  }
})

/*
  @route: POST /login/
  @desc: Ask for access token from Twitter using verification code/token from user
  @access: public
  @return (success):
    {
      oauth_token: 'abcd',
      oauth_token_secret: 'edfg',
      user_id: '1234',
      screen_name: '_dabasajay'
    }
*/
router.post('/', async (req, res) => {
  try {
    request.post(
      {
        url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
        oauth: {
          consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
          token: req.query.oauth_token,
        },
        form: { oauth_verifier: req.query.oauth_verifier },
      },
      function (err, response, body) {
        try {
          if (err) throw err
          return res
            .status(200)
            .json(JSON.parse('{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}'))
        } catch (err) {
          logger.error(err.stack)
          return res.status(400).json({
            message: 'Unknown error occurred!',
          })
        }
      }
    )
  } catch (err) {
    logger.error(err.stack)
    return res.status(400).json({
      message: 'Unknown error occurred!',
    })
  }
})

module.exports = router
