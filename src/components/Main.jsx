import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {MdOutlinePlaylistAdd , MdOutlinePlaylistAddCheck , MdOutlineClose} from "react-icons/md";
import {BsFillPlayFill} from "react-icons/bs";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { UserAuth } from '../context/AuthContext';
import { db } from "../firebase";
import {arrayUnion, doc , updateDoc} from "firebase/firestore";

const Main = ({fetchUrl}) => {
  const [movies,setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [add, setAdd] = useState(false);
  const [List, setList] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();

  const movieId = doc(db, 'users' , `${user?.email}`);
  console.log("initial");
  const savedShow = async (e) => {
    e.preventDefault();
      if(user?.email){
          setAdd(true);
          console.log("first");
          setList(true);
          console.log("second");
          await updateDoc(movieId , {
          myList: arrayUnion({
              id: movie.id,
              title: movie.title,
              img: movie.backdrop_path,
              year : movie.release_date
          })
          })
      }
      else{
          navigate("/signIn");
      }
  }

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    }
  }
  
  const movie = useMemo( () => {
    return movies[Math.floor(Math.random() * movies.length)]
  },[movies]);
  
  useEffect(()=>{
    const fetchData = async () => {
      let res = await fetch(fetchUrl);
      let json = await res.json();
      let data = json.results;
      setMovies(data);
      console.log("setmovies changed");
      return res;
    };
    fetchData(); 
  },[fetchUrl]);
  
  console.log("outside");

  const handleClose = (e) => {
    e.preventDefault();
    if(trailerUrl){
      setTrailerUrl("");
      console.log("setTrailer changed");
    }
  };

  const handleClick = (movie,e) => {
    e.preventDefault();
    movieTrailer(movie?.title || "")
      .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
        console.log(urlParams.get("v"));
        setTrailerUrl(urlParams.get("v"));
        console.log("setTrailer changed insider click");
      })
      .catch(error => console.log(error));
    
  };
  
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };
  
  return (
    <>
      <div className="w-full h-[600px]">
        <div className="">
          <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'/>
          <div className='absolute w-full h-[600px] bg-gradient-to-t from-[#111111]'/>
          <img
            className='w-full h-[600px] object-cover'
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.title}
          />
          <div className="absolute top-[17%] sm:top-[24%] ml-6 sm:ml-10 p-4">
            <h1 className="text-4xl md:text-5xl pb-6 font-bold">{movie?.title}</h1>
            <p className="text-gray-400 pb-3">Released Date: {movie?.release_date}</p>
            <p className="w-[200px] md:w-[600px] text-base md:text-lg pb-4">{truncateString(movie?.overview,200)}</p>
            <div className="w-full">
            <button onClick={(e) => handleClick(movie,e)} className="bg-gray-200 hover:bg-transparent hover:text-gray-200 py-2 px-4 mr-4 mb-2 text-[#111111] border-gray-200 border inline-flex items-center transition-all"><BsFillPlayFill size={30} className="inline-block"/><span className="ml-1">Play</span></button>
            <button onClick={savedShow} className="text-gray-200 hover:bg-gray-200 hover:text-[#111111] py-2 px-4 border-gray-200 border inline-flex items-center transition-all">{add ? <MdOutlinePlaylistAddCheck size={30} className="inline-block"/> : <MdOutlinePlaylistAdd size={30} className="inline-block"/>}<span className="ml-2">Watch Later</span></button>
            </div>
          </div>
        </div>
      </div>
      {trailerUrl &&
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[400px] md:h-[80%] mx-auto p-4 bg-black/95 z-[110]">
            <MdOutlineClose onClick={(e) => handleClose(e)} size={30} className="absolute top-3 right-3 cursor-pointer opacity-50 hover:opacity-100"/>
            <Youtube className="w-[95%] h-[100%] mx-auto" videoId={trailerUrl} opts={opts}/>
          </div>
      }
    </>
)
}

export default Main;