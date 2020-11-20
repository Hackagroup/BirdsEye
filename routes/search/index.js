const express = require('express')
const router = express.Router()
const Twitter = require('twitter')
const logger = require('../../utils/logger')

/*
  @route: GET /search
  @desc: Search tweets
  @access: private
*/
router.get('/', async (req, res) => {
  try {
    let client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
      access_token_key: req.query.access_token,
      access_token_secret: req.query.access_token_secret
    });
    client.get('search/tweets', { q: req.query.searchQuery }, function(err, tweets, response) {
      try {
      if (err) throw err;
      return res.status(200).json({ tweets })
      } catch (err) {
        logger.error(err.stack)
        return res.status(400).json({
          message: 'Unknown error occurred!',
        })
      }
   });
  } catch (err) {
    logger.error(err.stack)
    return res.status(400).json({
      message: 'Unknown error occurred!',
    })
  }
})

module.exports = router