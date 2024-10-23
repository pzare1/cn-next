import Navbar from '@components/Navbar'
import SearchResults from '@components/SearchResults'
import React from 'react'

function page({params}: {params : {query: string}}) {
const query = params.query
const decodedInput = decodeURIComponent(query);
  return (
    <>
      <Navbar/>
      <SearchResults query={decodedInput}/>
    </>
  )
}

export default page