import React, { useEffect, useState } from 'react';
import Movie from "./Movie";
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos, MdOutlineClose} from "react-icons/md";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";


const Row = ({ first, id, title, fetchUrl}) => {
  
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    }
  }

  useEffect(()=>{
    const fetchData = async () => {
      let res = await fetch(fetchUrl);
      let json = await res.json();
      let data = json.results;
      setMovies(data);
      return res;
    };
    fetchData();
  },[fetchUrl])

  const handleClose = () => {
    if(trailerUrl){
      setTrailerUrl("");
    }
  };

  const handleClick = (movie) => {
    
    movieTrailer(movie?.title || "")
      .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
        console.log(urlParams.get("v"));
        setTrailerUrl(urlParams.get("v"));
      })
      .catch(error => console.log(error));
    
  };

  const slideLeft = () => {
    var slider = document.getElementById('slider' + id);
    slider.scrollLeft = slider.scrollLeft - 830;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider' + id);
    slider.scrollLeft = slider.scrollLeft + 830;
  };


  return (
    <>
      <div className="relative max-w-[1650px] mx-auto p-4">
        <h2 className="text-3xl font-semibold pl-3 py-8">{title}</h2>
        <div className="relative group">
          <MdOutlineArrowBackIosNew size={40} onClick={slideLeft} className="hidden absolute top-1/2 left-10 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer z-[90] group-hover:block opacity-50 hover:opacity-100"/>
          <div id={'slider' + id} className="relative flex overflow-x-scroll w-full mx-auto scrollbar-hide mb-8 scroll-smooth">
            {movies.map((movie,index) => {
              return (
                <Movie first={first} handleClick={handleClick} movie={movie} key={index}/>
              )
            })}
          </div>
          <MdOutlineArrowForwardIos size={40} onClick={slideRight} className="hidden absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer z-[90] group-hover:block opacity-50 hover:opacity-100"/>
        </div>
      </div>
        {trailerUrl &&
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[400px] md:h-[80%] mx-auto p-4 bg-black/95 z-[110]">
            <MdOutlineClose onClick={handleClose} size={30} className="absolute top-3 right-3 cursor-pointer opacity-50 hover:opacity-100"/>
            <Youtube className="w-[95%] h-[100%] mx-auto" videoId={trailerUrl} opts={opts}/>
          </div>
        }
    </>
  )
}

export default Row;

