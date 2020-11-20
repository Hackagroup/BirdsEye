import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
//import { use } from '../../../../routes/login'
import API from '../../api'

function Dashboard() {
  const [search, setSearch] = useState('')
  const [thats_the_tweet, setTheTweet] = useState('')
  const [loading, setLoading] = useState(false)
  const [tweets, setTweets] = useState([])

  async function createTweet() {
    // create tweet function
  }


  async function postATweet() {

    const response = await API.post.get('', { tweet_body: thats_the_tweet })
    if (response.message == null) {
      const { tweets } = response
      const { statuses } = tweets
      console.log(tweets)
      setTweets(statuses ?? [])
    }
    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div>Dashboard page (Private)</div>
      <br />
      {loading ? (
        <div>Fetching tweets...</div>
      ) : (
          <>
            <div>Search some tweets:</div>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="button" onClick={handleSubmit}>
              Go
          </button>
            <div>Share something!</div>
            <input type="text" value={thats_the_tweet} onChange={(e) => setTheTweet(e.target.value)} />
            <button type="button" onClick={postATweet}>
              Tweet
          </button>

            <hr />
            <div>Search result</div>
            {tweets.map((tweet) => {
              const hashtags = tweet?.entities?.hashtags ?? []
              return (
                <div key={tweet.id_str}>
                  <div>Text: {tweet.text}</div>
                  <div>Created at: {tweet.created_at}</div>
                  <div>
                    Hashtags: {hashtags.length > 0 ? hashtags.map((x) => x.text).join(', ') : 'None'}
                  </div>
                  <hr />
                </div>
              )
            })}
          </>
        )}
    </>
  )
}

export default Dashboard