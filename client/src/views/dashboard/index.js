import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
function Dashboard() {

  async function createTweet() {
    // create tweet function
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
    </>
  )
}

export default Dashboard
