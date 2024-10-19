"use client";

import { Movie, Video } from "@lib/types";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Props {
  movie: Movie;
  isClose: () => void;
}

function Model({ movie, isClose }: Props) {
  const [video, setvideo] = useState("");
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

  return (
    <>
      <div className="modal m-3">
        <button className="modal-close text-white/70" onClick={isClose}>
          <IoIosCloseCircleOutline className="w-7 h-7" />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${video}`}
          className="model-video w-full h-2/5"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </>
  );
}

export default Model;
