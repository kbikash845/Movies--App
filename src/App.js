import React, { useState } from 'react'
import MovieList from './Component/MoviesList';
import './App.css';

function App() {

  const [movies,setMovies]=useState([])
  const [isLoading,setLoading]=useState(false)

async function FetchApiHandler(){
  setLoading(true);
     const response=await fetch("https://swapi.dev/api/films/")
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
    setLoading(false);
  
}
  return(
   <React.Fragment>
  <section className='main'>
    <button onClick={FetchApiHandler}>Fetch Movies</button>
  </section>
  <section>
    { !isLoading && <MovieList movies={movies}/>}
    {!isLoading && movies.length===0 && <p>Found no Movies</p>}
    {isLoading && <p>Loading...</p>}
  </section>
  </React.Fragment>
    
  )
}

export default App
