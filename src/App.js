import React, { useState } from 'react'
import MovieList from './Component/MoviesList';
import './App.css';

function App() {

  const [movies,setMovies]=useState([])
  const [isLoading,setLoading]=useState(false)
  const [error,SetError]=useState(null)

async function FetchApiHandler(){
  setLoading(true);
  SetError(null)
  try{

    const response=await fetch("https://swapi.dev/api/film/")
    if(!response.ok){
      throw new Error("Something went Wrong")
     }
    const data=await response.json();

    
  
     const transformMovies=data.results.map(moviesData=>{
       return {
         id:moviesData.episode_id,
         title:moviesData.title,
         openingText:moviesData.opening_crawl,
         releaseDate:moviesData.release_date
       };
     })
     setMovies(transformMovies);
    
  }catch(error){
   SetError(error.message);
  }
  setLoading(false);
}
let content=<p>Found no Movies</p>
if(movies.length>0){
  content=<MovieList movies={movies}/>
}
if(error){
  content=<p>{error}</p>
}
if(isLoading){
  content=<p>Loading...</p>
}

  return(
   <React.Fragment>
  <section className='main'>
    <button onClick={FetchApiHandler}>Fetch Movies</button>
  </section>
  <section>
  {content}
  </section>
  </React.Fragment>
    
  )
}

export default App
