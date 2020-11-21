import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import API from '../../api'
import './dashboard.css'
import keyword_extractor from 'keyword-extractor'

function Dashboard() {
  const [tweetContent, setTweetContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [tweet, setTweet] = useState('')
  const [tweets, setTweets] = useState([])

  async function handleSubmit() {
    setLoading(true)
    const response = await API.tweet.post({ tweetBody: tweetContent })
    if (response.message == null) {
      const { tweet } = response
      console.log(tweet)
      setTweet(tweet)
      const keywords = keyword_extractor.extract(tweet.text,{
        language:"english",
        remove_digits: true,
        return_changed_case:true,
        remove_duplicates: true
      })
      console.log(keywords)
      await searchtweet(keywords)
    }
    setLoading(false)
  }

  async function searchtweet(sentence) {
    setLoading(true)
    const response = await API.tweet.get('', {
      searchQuery: sentence,
      result_type: 'popular',
      count: 30,
      lang: "en",
      tweet_mode:'extended',
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
      <div>Text: {tweet.text}</div>
      <p>Similar tweets for you to look @(Verified handles only)</p>
            {tweets
              .filter((tweet) => tweet.user.verified ) // Filter verified users
              .map((tweet) => {
                const hashtags = tweet?.entities?.hashtags ?? []
                const links = tweet?.entities?.urls ?? []
                const images = tweet?.quoted_status?.extended_entities?.media ?? []
                return (
                  <div key={tweet.id_str}>
                    <div>Text: {tweet.full_text}</div>
                    <div>Created at: {tweet.created_at}</div>
                    <div>
                      Hashtags: {hashtags.length > 0 ? hashtags.map((x) => x.text).join(', ') : 'None'}
                    </div>
                    <div>
                      Tweet Links:{' '}
                      {links.length > 0 ? links.map((x) =>{
                        return (
                          <a target="_blank" href={x.expanded_url}>{x.expanded_url}</a>
                        )
                      }): 'None'}
                    </div>
                    <div>
                      Images :{' '}
                      {images.length > 0 ? images.map((x) =>{
                        console.log(x.media_url_https)
                        return (
                          <img width="500px" src={x.media_url_https}/>
                        )
                      }): 'None'}
                    </div>
                    <hr />
                  </div>
                )
            })}
    </>
  )
}

export default Dashboard
