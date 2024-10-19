import { getApiResponse } from "@lib/requests"

export const fetchTrending = async () => {
  const data = await getApiResponse("/trending/movie/week")
  const trending = data.results

  return trending
}

export const fetchGenreMovies = async () => {
  const data = await getApiResponse("/genre/movie/list")
  const genres = data.genres
  console.log('text',genres)
  for (const genre of genres) {
    const data = await getApiResponse(`/discover/movie?with_genres=${genre.id}`)
    console.log('best',data)
    genre.movies = data.results
  }

  return genres
}
