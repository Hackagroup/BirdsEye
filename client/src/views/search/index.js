import React, { useState } from 'react'
import API from '../../api'
import { Helmet } from 'react-helmet'

function Search() {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [tweets, setTweets] = useState([])

  async function handleSubmit() {
    setLoading(true)
    const response = await API.tweet.get('', {
      searchQuery: search,
      result_type: 'popular',
      count: 20,
    })
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
        <title>#BirdsEye - Search</title>
      </Helmet>
      <div style={{ padding: '5px 10px' }}>
        {loading ? (
          <p>Fetching tweets...</p>
        ) : (
          <>
            <p>Search some tweets</p>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="button" onClick={handleSubmit}>
              Go
            </button>
            <hr />
            <p>Search results (Verified handles only)</p>
            {tweets
              .filter((tweet) => tweet.user.verified) // Filter verified users
              .map((tweet) => {
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
      </div>
    </>
  )
}

export default Search
