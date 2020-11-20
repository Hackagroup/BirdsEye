const Twitter = require('twitter')
const logger = require('./logger')

/*
  Creates a new twitter client and returns us
*/
function getTwitterClient(req) {
  if (req.query.access_token_key == null) {
    logger.info(`Invalid access token key.`)
  }
  if (req.query.access_token_secret == null) {
    logger.info(`Invalid access token secret.`)
  }
  return new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
    access_token_key: req.query.access_token_key,
    access_token_secret: req.query.access_token_secret,
  })
}

module.exports = getTwitterClient
