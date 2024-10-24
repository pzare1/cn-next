"use client"

import { baseImgUrl } from '@lib/constants'
import { Movie } from '@lib/types'
import React, { useState } from 'react'
import Model from './Model'

function MovieCard({movie}: {movie: Movie}) {
    const [showModal, setShowModel] = useState<boolean>(false)
    const isOpen = () => setShowModel(true)
    const isClose = () => setShowModel(false)
  return (
    <>
    <div className='movie-card' onClick={isOpen}>
        <img className='thumbnail' alt={movie?.name || movie?.title}  src={movie?.backdrop_path || movie?.poster_path ? `${baseImgUrl}${movie?.backdrop_path || movie?.poster_path}`: '/assets/noimage.jpg'}/>
        <div className='border'></div>
    </div>
    {showModal && <Model movie={movie} isClose={isClose}/>}
    </>
  )
}

export default MovieCard