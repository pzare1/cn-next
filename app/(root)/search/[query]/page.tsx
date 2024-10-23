import Navbar from '@components/Navbar'
import SearchResults from '@components/SearchResults'
import React from 'react'

function page({params}: {params : {query: string}}) {
const query = params.query
  return (
    <>
      <Navbar/>
      <SearchResults query={query}/>
    </>
  )
}

export default page