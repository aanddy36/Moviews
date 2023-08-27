import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "./tempData";
import { NavBar } from "./components/NavBar";
import { Box } from "./components/Box";
import { Movie } from "./components/Movie";
import { WatchedSummary } from "./components/WatchedSummary";
import { WatchedMovie } from "./components/WatchedMovie";
import {MovieDetails} from "./components/MovieDetails"
import {useSearchMovies} from "./useSearchMovies"
//1. ARREGLAR RESPONSIVENESS
//2. CAMBIAR FLECHA DE REGRESO EN MovieDetails.jsx
//3. CAMBIAR DETALLES VISUALES DE MovieDetails.jsx (Ej: directed by, starring, rating, etc)
const KEY = "8d9cf5ef"
function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState(tempWatchedData);
  const [selectedId, setSelectedId] = useState(null)
  const {movies, isLoading,error} = useSearchMovies(query)
  useEffect(()=>console.log(movies),[movies])

  const handleSelectMovie = (id)=>{
    setSelectedId(prev=>{
      if(prev === id){ 
        return null}
      return id
    })
  }
  const handleCloseMovie = ()=>{
    setSelectedId(null)
  }

  return (
    <>
      <NavBar query={query} setQuery={setQuery} amount={movies.length}/>

      <main className="main">
        <Box movie={movies.length > 0} message={"movie list"}>
            {error && <p className="error">Oh no! {error}</p>}
            {isLoading && <p className="loader">Loading...</p>}
            {query.length < 3 ? <p className="descrp">movie list</p> :
            <ul className="list list-movies">
              {movies?.map((movie) => {
                return <Movie movie={movie} key={movie.imdbID} onSelectMovie={handleSelectMovie}/>
                })}
            </ul>}
        </Box>
        <Box movie={selectedId} message={"movie details"}>
          {selectedId ? <MovieDetails id={selectedId} onCloseMovie={handleCloseMovie}/> : <>
            {<p className="descrp">Movie details</p>}
          </>}
        </Box>
      </main>
    </>
  )
}

export default App
