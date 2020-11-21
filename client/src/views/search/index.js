import React, { useState } from 'react'
import API from '../../api'
import { Helmet } from 'react-helmet'
import keyword_extractor from 'keyword-extractor'

function Search() {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [tweets, setTweets] = useState([])

  async function handleSubmit() {
    setLoading(true)
    console.log(keyword_extractor.extract(search,{
      language:"english",
      remove_digits: true,
      return_changed_case:true,
      remove_duplicates: true
    }))
    const response = await API.tweet.get('', {
      searchQuery: keyword_extractor.extract(search,{
        language:"english",
        remove_digits: true,
        return_changed_case:true,
        remove_duplicates: true
      }),
      result_type: 'popular',
      count: 30,
      lang: "en",
      tweet_mode: "extended",
      include_entities: true
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
                const links = tweet?.entities?.urls ?? []
                console.log(links);
                return (
                  <div key={tweet.id_str}>
                    <div>Text: {tweet.full_text}</div>
                    <div>Created at: {tweet.created_at}</div>
                    <div>
                      Hashtags:{' '}
                      {hashtags.length > 0 ? hashtags.map((x) => x.text).join(', ') : 'None'}
                    </div>
                    <div>
                      Tweet Links:{' '}
                      {links.length > 0 ? links.map((x) =>{
                        return (
                          <a target="_blank" href={x.expanded_url}>{x.expanded_url}</a>
                        )
                      }): 'None'}
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
