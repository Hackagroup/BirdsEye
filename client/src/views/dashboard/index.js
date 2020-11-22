import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import keyword_extractor from 'keyword-extractor'
import API from '../../api'
import LottieAnimation from '../../components/LottieAnimation'
import { SET_STATE } from '../../actions/types'
import './dashboard.css'
import TwitterIcon from '../../assets/bird-white.png'
import TweetComment from '../../assets/tweet-comment.png'
import TweetRT from '../../assets/tweet-rt.png'
import TweetLike from '../../assets/tweet-like.png'

function parseDate(date) {
  return date.substring(4, 8) + ' ' + date.substring(8, 11)
}

function ShowTweet(props) {
  const { tweet } = props;
  const { user, full_text } = tweet
  return (
    <div className="ShowTweet">
      <div className="ShowTweet__header">
        <div>
          <img src={user.profile_image_url}/>
          <span>{user.screen_name}</span>
        </div>
        <div>{parseDate(tweet.created_at)}</div>
      </div>
      <div className="ShowTweet__content">
        {full_text}
      </div>
      <div className="ShowTweet__actions">
        <div><img src={TweetComment} /><span>20</span></div>
        <div><img src={TweetRT} /><span>54</span></div>
        <div><img src={TweetLike} /><span>100</span></div>
      </div>
    </div>
  );
}

async function customWait(interval) {
  return new Promise(res => setInterval(res, interval))
}

function Dashboard() {
  const [tweetContent, setTweetContent] = useState('')
  // -1: initial, 0: creating, 1: created
  const [postCreationStatus, setPostCreationStatus] = useState(-1)
  const [similarTweets, setSimilarTweets] = useState([])

  const application = useSelector((state) => state.application)
  const dispatch = useDispatch()
  const { searchQuery, searchQueryStatus } = application

  async function handleSubmit() {
    if (tweetContent.trim().length === 0) return
    setPostCreationStatus(0)
    const response = await API.tweet.post({ tweetBody: tweetContent })
    if (response.message == null) {
      // const { tweet: createdTweet } = response
      setPostCreationStatus(1)
      await customWait(5000)
      setPostCreationStatus(-1)
      dispatch({
        type: SET_STATE,
        payload: {
          searchQuery: tweetContent,
          searchQueryStatus: -1
        }
      })
    } else {
      setPostCreationStatus(-1)
    }
  }

  async function searchtweet(sentence) {
    const keywords = keyword_extractor.extract(sentence, {
      language: 'english',
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    })
    const response = await API.tweet.get('', {
      searchQuery: keywords,
      result_type: 'popular',
      count: 30,
      lang: 'en',
      tweet_mode: 'extended',
      include_entities: true,
    })
    if (response.message == null) {
      const { tweets } = response
      const { statuses } = tweets
      setSimilarTweets(statuses ?? [])
      dispatch({
        type: SET_STATE,
        payload: {
          searchQuery: '',
          searchQueryStatus: 1
        }
      })
    } else {
      dispatch({
        type: SET_STATE,
        payload: {
          searchQuery: '',
          searchQueryStatus: -1
        }
      })
    }
  }

  let postTweetRender = (
    <>
      <textarea
        type="text"
        rows={3}
        placeholder="Tweet to take flight and get a birds eye view..."
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)}
      />
      <button type="button" onClick={handleSubmit}>
        <img src={TwitterIcon} alt="Twitter logo" />
      </button>
    </>
  )

  if (postCreationStatus === 0) {
    postTweetRender = (
      <div className="Dashboard__postTweet-loader">
        <LottieAnimation variant="loader" loop/>
      </div>
    );
  } else if (postCreationStatus === 1) {
    postTweetRender = (
      <div className="Dashboard__postTweet-loader">
        <LottieAnimation variant="success"/>
      </div>
    );
  }

  let similarTweetsRender = null

  if (searchQueryStatus === 1 && similarTweets.length > 0) {
    similarTweetsRender = similarTweets
      .filter((tweet) => tweet.user.verified) // Filter verified users
      .map((tweet) => <div key={tweet.id_str}><ShowTweet tweet={tweet}/></div>)
  } else if (searchQueryStatus === 0) {
    similarTweetsRender = (
      <div className="Dashboard__searchResults-loader--parent">
        <div className="Dashboard__searchResults-loader">
          <LottieAnimation variant="loader" loop/>
        </div>
      </div>
    )
  }
  
  useEffect(() => {
    async function fetchTweets(q) {
      await searchtweet(q)
      dispatch({
        type: SET_STATE,
        payload: {
          searchQuery: '',
          searchQueryStatus: 1
        }
      })
    }
    if (searchQueryStatus === -1 && searchQuery.length > 0) {
      dispatch({
        type: SET_STATE,
        payload: {
          searchQueryStatus: 0
        }
      })
      fetchTweets(searchQuery)
    } else if (searchQueryStatus === 1 && similarTweets.length === 0) {
      dispatch({
        type: SET_STATE,
        payload: {
          searchQuery: '',
          searchQueryStatus: -1
        }
      })
    }
  }, [searchQuery, searchQueryStatus])

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="Dashboard__parent">
        <div className="Dashboard">
          <div className="Dashboard__postTweet">
            {postTweetRender}
          </div>
          <hr style={{
            width: '100%',
            borderBottom: '0',
            borderLeft: '0',
            borderRight: '0',
            borderTop: '4px solid #45A1E5',
            margin: '0'
          }} />
          <div className="Dashboard__resultHeading">
            {
              searchQueryStatus === 1 && similarTweets.length > 0 ?
              <>Here's your <span>#BirdsEye</span> view</>
              :
              (
                searchQueryStatus === -1 ?
                <>Search or post tweet to get <span>#BirdsEye</span> view</>
                :
                <>Getting your <span>#BirdsEye</span> view</>
              )
            }
          </div>
          <div className="Dashboard__searchResults">
            {similarTweetsRender}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
