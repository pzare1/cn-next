import { fetchTrending } from "@actions/movieData"
import HeroCard from "./HeroCard";

async function Hero() {
    const trending = await fetchTrending()
    const randomNumber = Math.floor(Math.random() * trending.length)
    const trendingMovies = trending[randomNumber];
  return (
    <>
        <HeroCard trendingMovies={trendingMovies}/>
    </>
  )
}

export default Hero