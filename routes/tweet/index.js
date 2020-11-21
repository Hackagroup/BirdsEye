const express = require('express')
const router = express.Router()
const logger = require('../../utils/logger')
const getTwitterClient = require('../../utils/getTwitterClient')

/*
  @route: GET /tweet/
  @desc: Search tweets using search a query
  @access: private
  @return (success): all tweets fetched by search query
*/

router.get('/', async (req, res) => {
  try {
    const client = getTwitterClient(req)
    const { searchQuery, result_type, count, lang, tweet_mode, include_entities } = req.query
    client.get(
      'search/tweets',
      {
        q: searchQuery,
        result_type: result_type,
        count: count,
        lang: lang,
        tweet_mode: tweet_mode,
        include_entities: include_entities,
      },
      function (err, tweets, response) {
        try {
          if (err) throw err
          return res.status(200).json({ tweets })
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

/*
  @route: POST /tweet/
  @desc: Create a new tweet
  @access: private
  @return (success): newly created tweet
*/

router.post('/', async (req, res) => {
  try {
    const client = getTwitterClient(req)
    const { tweetBody } = req.body
    client.post('statuses/update', { status: tweetBody }, function (error, tweet, response) {
      try {
        if (error) throw error
        return res.status(200).json({ tweet })
      } catch (err) {
        logger.error(err.stack ? err.stack : JSON.stringify(err))
        return res.status(400).json({
          message: 'Unknown error occurred!',
        })
      }
    })
  } catch (err) {
    logger.error(err.stack ? err.stack : JSON.stringify(err))
    return res.status(400).json({
      message: 'Unknown error occurred!',
    })
  }
})

module.exports = router
