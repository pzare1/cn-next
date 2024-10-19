import { Genre, Movie } from '@lib/types'
import React from 'react'

interface Props{
    title: string,
    movies: Movie[]
}

function CategoryList({title,movies} : Props) {
  return (
    <div>CategoryList</div>
  )
}

export default CategoryList