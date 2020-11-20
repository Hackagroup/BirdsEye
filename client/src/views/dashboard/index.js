import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import API from '../../api'
import './dashboard.css'

function Dashboard() {
  const [tweetContent, setTweetContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    const response = await API.tweet.post({ tweetBody: tweetContent })
    if (response.message == null) {
      const { tweet } = response
      console.log(tweet)
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
    </>
  )
}

export default Dashboard
