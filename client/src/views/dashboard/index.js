import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import keyword_extractor from 'keyword-extractor'
import API from '../../api'
import './dashboard.css'

function Dashboard() {
  const [tweetContent, setTweetContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [similarTweets, setSimilarTweets] = useState([])

  async function handleSubmit() {
    setLoading(true)
    const response = await API.tweet.post({ tweetBody: tweetContent })
    if (response.message == null) {
      const { createdTweet } = response
      console.log('Created tweet: ', createdTweet)
      const keywords = keyword_extractor.extract(createdTweet.text, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true
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
      lang: "en",
      tweet_mode:'extended'
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
      <div style={{ padding: '5px 10px' }}>
        {loading ? (
          <p>Posting new tweet...</p>
        ) : (
          <>
            <p>Share something!</p>
            <input
              type="text"
              value={tweetContent}
              onChange={(e) => setTweetContent(e.target.value)}
            />
            <button type="button" onClick={handleSubmit}>
              Tweet!
            </button>
          </>
        )}
      </div>
      <p>Similar tweets for you to look @(Verified handles only)</p>
            {similarTweets
              .filter((tweet) => tweet.user.verified ) // Filter verified users
              .map((tweet) => {
                const hashtags = tweet?.entities?.hashtags ?? []
                return (
                  <div key={tweet.id_str}>
                    <div>Text: {tweet.full_text}</div>
                    <div>Created at: {tweet.created_at}</div>
                    <div>
                      Hashtags: {hashtags.length > 0 ? hashtags.map((x) => x.text).join(', ') : 'None'}
                    </div>
                    <hr />
                  </div>
                )
            })}
    </>
  )
}

export default Dashboard
