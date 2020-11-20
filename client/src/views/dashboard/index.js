import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import API from '../../api';

function Dashboard() {
  const [search, setSearch] = useState('');

  async function handleSubmit() {
    const tweets = await API.search.get('', { searchQuery: search })
    console.log(tweets)
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div>Dashboard page (Private)</div>
      <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
      <button type="button" onClick={handleSubmit} >Search</button>
    </>
  )
}

export default Dashboard
