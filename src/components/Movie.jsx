import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {BsFillPlayFill} from "react-icons/bs";
import {MdOutlinePlaylistAdd, MdOutlinePlaylistAddCheck} from "react-icons/md";
import { UserAuth } from '../context/AuthContext';
import { db } from "../firebase";
import {arrayUnion, doc , updateDoc} from "firebase/firestore";

const Movie = ({handleClick, movie , first}) => {
    const [add, setAdd] = useState(false);
    const [List, setList] = useState(false);
    const { user } = UserAuth();
    const navigate = useNavigate();

    const movieId = doc(db, 'users' , `${user?.email}`);

    const savedShow = async (e) => {
        if(user?.email){
            setAdd(true)
            setList(true)
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

    return (
    <div className="relative inline-block mr-3 last-of-type:mr-0">
        <img className={first ?  "block min-w-[270px] h-[400px] object-cover" : "block min-w-[400px]"} src={first ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`} alt={`${movie?.title}`}/>
        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 transition-opacity'>
        <p className="absolute top-6 left-6 pr-3 text-lg font-semibold">{movie?.title}<span className='text-xs text-gray-400 block'>{movie?.release_date.slice(0,4)}</span></p>
        <p onClick={savedShow} className="absolute bottom-6 right-6 cursor-pointer opacity-50 hover:opacity-100">
            {add ? <MdOutlinePlaylistAddCheck size={30} /> : <MdOutlinePlaylistAdd size={30}/>}
        </p>
        <BsFillPlayFill onClick={() => handleClick(movie)} size={50} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer opacity-50 hover:opacity-100"/>
        </div>
    </div>
  )
}

export default Movie;