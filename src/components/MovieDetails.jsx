import { FaAngleDoubleLeft } from 'react-icons/fa';
import React, { useEffect, useState } from 'react'
import { StarRating } from './StarRating'

const KEY = "8d9cf5ef"

export const MovieDetails = ({id, onCloseMovie}) => {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const {Title, Year, Poster, Runtime, imdbRating,
    Plot, Released, Actors, Director, Genre} = movie
    useEffect(()=>{
        const getMovieDetails = async ()=>{
            try {
                setIsLoading(true)
                const resp = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`)
                const data = await resp.json()
                setMovie(data)
            }catch(err){
                console.log(err.message);
            }finally{
                setIsLoading(false)
            }
        }
        getMovieDetails()
    },[id])

    useEffect(()=>{
        if(!Title)return
        document.title = `${Title} (${Year}) | Moviews`
        return ()=> document.title = "Moviews"
    },[Title])
    useEffect(()=>{
        const callback = (e)=>{
            if(e.code === "Escape"){
              onCloseMovie()
            }
          }
        document.addEventListener("keydown", callback)
        return ()=>document.removeEventListener("keydown", callback)
      },[onCloseMovie])
  return (
    <div className='details'>
        {isLoading ? <p className="loader">Loading...</p> :
        <>
        <header>         
            <button className='btn-back' onClick={onCloseMovie}><FaAngleDoubleLeft/></button>
            <img src={Poster} alt={`Poster of ${movie} movie`}/>
            <div className="details-overview">
                <h2>{Title}</h2>
                <p>
                    {Released} &bull; {Runtime}
                </p>
                <p>{Genre}</p>
                <p>{imdbRating} IMDb rating</p>
            </div>
        </header>
        <section>
            <div className="rating">
                <StarRating/>
            </div>
            <p><em>{Plot}</em></p>
            <p>Starring {Actors}</p>
            <p>Directed by {Director}</p>
        </section>
        </>
        }
    </div>
  )
}
