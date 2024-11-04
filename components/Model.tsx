"use client";

import { Movie, Video } from "@lib/types";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiCircleMinus } from "react-icons/ci";
import { GrLanguage } from "react-icons/gr";
import { FaRegStar } from "react-icons/fa";
import { useSession } from "@node_modules/next-auth/react";

interface Props {
  movie: Movie;
  isClose: () => void;
}
interface Genre {
  name: string;
}
interface Country {
  name: string;
}
interface Profile {
  email: string;
  username: string;
  favorites: number[];
}

function Model({ movie, isClose }: Props) {
  const [video, setvideo] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<Profile>();
  const [isFavorite, setisFavorite] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  const fetchMovie = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/movie/${movie.id}?append_to_response=videos`,
        options
      );
      const data = await res.json();
      console.log("data", data);
      if (data?.genres) {
        setGenres(data?.genres);
      }
      if (data?.production_countries) {
        setCountries(data?.production_countries);
      }
      console.log("genres", genres);
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (video: Video) => video.type === "Trailer"
        );
        setvideo(data.videos.results[index].key);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [movie]);

  const { data: session } = useSession();
  console.log("session", session);
  const getUser = async () => {
    try {
      const res = await fetch(`/api/user/${session?.user?.email}`);
      const data = await res.json();
      setLoading(false);
      setisFavorite(data.favorites.find((item: number) => item == movie.id ))
      setUser(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    if(session){
    getUser();
    }
  }, [session]);

  return (
    <>
      <div className="modal m-3">
        <div className="w-full bg-black h-12 flex justify-end items-center relative">
          <button className="mx-4 text-white/70" onClick={isClose}>
            <IoIosCloseCircleOutline className="w-7 h-7" />
          </button>
        </div>
        <iframe
          src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1`}
          className="model-video w-full h-2/5"
          loading="lazy"
          allowFullScreen
        />
        <div className="modal-content">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <p className="font-bold text-md">
                {movie?.name || movie?.original_title}
              </p>
            </div>
            <div onClick={() => setisFavorite(!isFavorite)} className="flex justify-center items-center gap-x-2">
              {isFavorite ? 
              (
                <>
                <p className="text-[14px]">Remove From List</p>
                <CiCircleMinus className="cursor-pointer text-red-500" />
                </>
              ) :
              
              (
                <>
                <p className="text-[14px]">Add To List</p>
                <IoAddCircleOutline className="cursor-pointer text-blue-1" />
                </>
              )
              
              }

            </div>
          </div>
          <div className="flex flex-row justify-start bg-blue-1 w-fit p-2 rounded-md text-[12px]">
            <p className="text-bold">Release Date:</p>
            <p className="text-bold">{movie?.release_date}</p>
          </div>
          <div className="flex justify-start my-2 text-xs">
            <p className="text-justify">{movie?.overview}</p>
          </div>
          <div className="flex justify-start my-2 text-xs">
            <p className="text-justify">Popularity: {movie?.popularity}</p>
          </div>
          <div className="flex justify-start items-center space-x-2 mb-2">
            <GrLanguage />
            {countries.map((country, index) => (
              <span key={index}>
                {country.name}
                {index < countries.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div className="flex justify-start items-center space-x-2 my-2 text-xs">
            <FaRegStar />
            <p className="text-justify">{movie?.vote_average}</p>
          </div>
          <div className="flex justify-start">
            {genres.map((genre, index) => (
              <span key={index}>
                {genre.name}
                {index < genres.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Model;
