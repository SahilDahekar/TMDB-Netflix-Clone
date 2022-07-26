import React, { useState, useEffect } from 'react';
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos, MdOutlineClose, MdDelete} from "react-icons/md";
import {BsFillPlayFill} from "react-icons/bs";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { UserAuth } from '../context/AuthContext';
import { db } from "../firebase";
import {onSnapshot, doc , updateDoc} from "firebase/firestore";

const SavedShows = () => {
    const {user} = UserAuth();
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const movieRef = doc(db, 'users' , `${user?.email}`);
    
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        }
    }

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

    const deleteShow = async(passedId) => {
        try {
            const final = movies.filter((movie) => movie.id !== passedId)
            await updateDoc(movieRef,{
                myList: final
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        onSnapshot(
            doc(db, 'users' , `${user?.email}`),(doc)=>{
                setMovies(doc.data()?.myList)
            }
        );
    },[user?.email])

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 830;
    };
    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 830;
    };

    return (
    <>
        <div className="relative max-w-[1650px] mx-auto p-4">
            <h2 className="text-4xl font-semibold pl-3 py-8">Saved Shows</h2>
            <div className="relative group">
            <MdOutlineArrowBackIosNew size={40} onClick={slideLeft} className="hidden absolute top-1/2 left-10 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer z-[90] group-hover:block opacity-50 hover:opacity-100"/>
                <div id={'slider'} className="relative flex overflow-x-scroll w-full mx-auto scrollbar-hide mb-8 scroll-smooth">
                {movies.map((movie,index) => {
                    return (
                    <div key={index} className="relative inline-block mr-3 last-of-type:mr-0">
                        <img className="block min-w-[400px]" src={`https://image.tmdb.org/t/p/w500${movie?.img}`} alt={`${movie?.title}`}/>
                        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 transition-opacity'>
                            <p className="absolute top-6 left-6 pr-3 text-lg font-semibold">{movie?.title}<span className='text-xs text-gray-400 block'>{movie?.year.slice(0,4)}</span></p>
                            <p onClick={()=> deleteShow(movie.id)} className="absolute bottom-6 right-6 cursor-pointer opacity-50 hover:opacity-100">
                                <MdDelete size={30}/>
                            </p>
                            <BsFillPlayFill onClick={() => handleClick(movie)} size={50} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer opacity-50 hover:opacity-100"/>
                        </div>
                    </div>
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

export default SavedShows;