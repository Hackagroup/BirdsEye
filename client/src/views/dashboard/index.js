import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import API from '../../api'

function Dashboard() {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [tweets, setTweets] = useState([])

  async function handleSubmit() {
    setLoading(true)
    const response = await API.search.get('', { searchQuery: search })
    if (response.message == null) {
      const { tweets } = response
      const { statuses } = tweets
      console.log(tweets)
      setTweets(statuses ?? [])
    }
    setLoading(false)
  }

  async function createTweet() {
    
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div>Dashboard page (Private)</div>
        <div>
        <div> Create a tweet </div>
         <input type="text" placeholder="Type a tweet" onclick={createTweet}/>
        </div>
      <br/>
      {loading ? (
        <div>Fetching tweets...</div>
      ) : (
        <>
          <div>Search some tweets:</div>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="button" onClick={handleSubmit}>
            Go
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
