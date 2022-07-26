import React from 'react';
import Navbar from "../components/Navbar";
import Main from '../components/Main';
import Row from '../components/Row';
import requests from "../request"

const Home = () => {
  return (
    <>
        <Navbar show={true} />
        <Main fetchUrl={requests.requestPopular}/>
        <Row first={true} id='1' title='Upcoming' fetchUrl={requests.requestUpcoming}/>
        <Row id='2' title='Trending' fetchUrl={requests.requestTrending}/>
        <Row id='3' title='Popular' fetchUrl={requests.requestPopular}/>
        <Row id='4' title='Top Rated' fetchUrl={requests.requestTopRated}/>
        <Row id='5' title='Horror' fetchUrl={requests.requestHorror}/>
    </>
  )
}

export default Home;