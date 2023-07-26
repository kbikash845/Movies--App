import React, { useCallback, useEffect, useState } from 'react'
import MovieList from './Component/MoviesList';
import './App.css';
import AddMovies from './Component/AddMovies';

function App() {

  const [movies,setMovies]=useState([])
  const [isLoading,setLoading]=useState(false)
  const [error,SetError]=useState(null)

  
const FetchApiHandler=useCallback(async function (){
  setLoading(true);
  SetError(null)
  try{

    const response=await fetch("https://react-htttp-d9933-default-rtdb.firebaseio.com/movies.json")
    
    if(!response.ok){
      throw new Error("Something went Wrong")
     }
    const data=await response.json();

    console.log(data)
    const loadingMovies=[]
    for(const key in data){
      loadingMovies.push({
        id:key,
        title:data[key].title,
        openingText:data[key].openingText,
        releaseDate:data[key].releaseDate
      })
    }
  
   
     setMovies(loadingMovies);
    
  }catch(error){
   SetError(error.message);
  }
  setLoading(false);
  
},[])
useEffect(()=>{
  FetchApiHandler()
},[FetchApiHandler]);

async function AddMoviesHandler(movie){
   const response= await fetch("https://react-htttp-d9933-default-rtdb.firebaseio.com/movies.json",{
  method:"POST",
  body:JSON.stringify(movie),
  headers:{
    "content-Type":"Application/json"
  }
})
const data=await response.json()

console.log(data)
  
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
    <section>
      <AddMovies onAddMovie={AddMoviesHandler}/>
    </section>
  <section >
    <button onClick={FetchApiHandler}>Fetch Movies</button>
  </section>
  <section>
  {content}
  </section>
  </React.Fragment>
    
  )
}

export default App
