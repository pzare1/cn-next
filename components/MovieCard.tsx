import { baseImgUrl } from '@lib/constants'
import { Movie } from '@lib/types'
import React from 'react'

function MovieCard({movie}: {movie: Movie}) {
  return (
    <div className='movie-card'>
        <img className='thumbnail' alt={movie?.name || movie?.title}  src={`${baseImgUrl}${movie?.backdrop_path || movie?.poster_path}`}/>
    </div>
  )
}

export default MovieCard