import { fetchGenreMovies } from '@actions/movieData'
import CategoryList from '@components/CategoryList'
import Hero from '@components/Hero'
import Navbar from '@components/Navbar'
import { Genre } from '@lib/types'
import React from 'react'

async function Home() {
  const genres = await fetchGenreMovies()
  const example = genres.slice(0,3)
  console.log('example',example)
  return (
    <>
      <Navbar/>
      <Hero/>
      <div className='all-movies'> 
        {genres.map((genre: Genre) => (
          <CategoryList key={genre.id} title={genre.name} movies={genre.movies}/>
        ))}
      </div>
    </>
  )
}

export default Home