import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import keyword_extractor from 'keyword-extractor'
import API from '../../api'
import './dashboard.css'
import Display from '../../components/Display'

function Dashboard() {
  const [tweetContent, setTweetContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [similarTweets, setSimilarTweets] = useState([])

  async function handleSubmit() {
    setLoading(true)
    const response = await API.tweet.post({ tweetBody: tweetContent })
    if (response.message == null) {
      const { tweet: createdTweet } = response
      console.log('Created tweet: ', createdTweet)
      const keywords = keyword_extractor.extract(createdTweet.text, {
        language: 'english',
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
      })
      await searchtweet(keywords)
    } else {
      setLoading(false)
    }
  }

  async function searchtweet(sentence) {
    const response = await API.tweet.get('', {
      searchQuery: sentence,
      result_type: 'popular',
      count: 30,
      lang: 'en',
      tweet_mode: 'extended',
      include_entities: true,
    })
    if (response.message == null) {
      const { tweets } = response
      const { statuses } = tweets
      console.log(tweets)
      setSimilarTweets(statuses ?? [])
    }
    setLoading(false)
  }

  async function searchInfographic(sentence) {
    const response = await API.tweet.get('', {
      searchQuery: sentence,
      result_type: 'popular',
      count: 30,
      lang: 'en',
      tweet_mode: 'extended',
      include_entities: true,
    })
    if (response.message == null) {
      const { tweets } = response
      const { statuses } = tweets
      console.log(tweets)
      setSimilarTweets(statuses ?? [])
    }
    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>#BirdsEye - Dashboard</title>
      </Helmet>
      <div id="tweet" style={{ padding: '5px 10px' }}>
        {loading ? (
          <p>Posting new tweet...</p>
        ) : (
          <>
            <p>Share something!</p>
            <div class="search">
              <input
                type="text"
                value={tweetContent}
                onChange={(e) => setTweetContent(e.target.value)}
              />
              <button type="button" onClick={handleSubmit}>
                Tweet!
              </button>
            </div>
          </>
        )}
      <p>Similar tweets for you to look @(Verified handles only)</p>
      </div>
      {similarTweets
        .filter((tweet) => tweet.user.verified) // Filter verified users
        .map((tweet) => {
          console.log(tweet)
          return (
            <div key={tweet.id_str}>
              <Display props={tweet} />
              <hr />
            </div>
          )
        })}
    </>
  )
}

export default Dashboard
