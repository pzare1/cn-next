import { baseImgUrl } from "@lib/constants"
import { Movie } from "@lib/types"
import { IoPlayOutline } from "react-icons/io5";
import { GrInfo } from "react-icons/gr";




function HeroCard({trendingMovies} : {trendingMovies : Movie}) {
    if(!trendingMovies){
        <p className="text-white text-xl">Loading ....</p>
    }
  return (
    <>
        <div className="hero">
            <div className="hero-bg">
                <img 
                src={`${baseImgUrl}${trendingMovies?.backdrop_path || trendingMovies?.poster_path}`}
                alt="trending-movie"
                className="hero-bg-image"
                />
            </div>
            <h1 className="hero-title">{trendingMovies?.title || trendingMovies?.name}</h1>
            <p className="hero-overview">{trendingMovies?.overview}</p>
            <div className="hero-btns">
                <button className="hero-btn"><IoPlayOutline/>Play</button>
                <button className="hero-btn"><GrInfo/>More Info</button>
            </div>
        </div>
    </>
  )
}

export default HeroCard