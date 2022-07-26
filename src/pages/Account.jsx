import React from 'react';
import Navbar from "../components/Navbar";
import SavedShows from '../components/SavedShows';

const Account = () => {
  return (
    <>
      <Navbar show={true} />  
      <div className="relative bg-netflix_bg h-screen w-full bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black/60">
          <div className="absolute top-1/4 w-full h-3/4 bg-black/80">
            <SavedShows/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account;