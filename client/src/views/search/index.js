import React, { useState } from 'react'
import API from '../../api'
import { Helmet } from 'react-helmet'
import keyword_extractor from 'keyword-extractor'
import Display from '../../components/Display'
import { Typography } from '@material-ui/core'
import 'fontsource-roboto';


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
          <Typography variant="h3" gutterBottom>
            Fetching tweets...  
          </Typography>
          
        ) : (
          <>
            <p>Search some tweets</p>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="button" onClick={handleSubmit}>
              Go
            </button>
            <hr />
            <p>Search results (Verified handles only)</p>
            <div className="all_searches">
            {tweets
              .filter((tweet) => tweet.user.verified) // Filter verified users
              .map((tweet) => {
                const hashtags = tweet?.entities?.hashtags ?? []
                const links = tweet?.entities?.urls ?? []
                const images = tweet?.quoted_status?.extended_entities?.media ?? []
                return (
                  <>
                    <Display key={tweet.id_str} props={tweet}/>
                    <br/>
                  </>
                )
              })}
             </div>
          </>
        )}
      </div>
    </>
  )
}

export default Search