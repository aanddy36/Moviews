import React, { useEffect, useState } from 'react'
const KEY = "8d9cf5ef"
export const useSearchMovies = (query) => {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading]= useState(false)
    const [error, setError] = useState("")
    useEffect(()=>{
        const controller = new AbortController()
        const fetchData = async ()=>{
          try{
            setIsLoading(true)
            setError('')
            const resp = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal})
            if(!resp.ok){
              throw new Error("Something went wrong")
            }
            const data = await resp.json()
            if(data.Response === "False"){
              setMovies([])
              throw new Error("Movie not found")
            }
            setMovies(data.Search)
            setError("")
          }catch(err){
            console.log(err);
            if(!err.name !== "AbortError"){
              setError(err.message)
            }
          }
          finally{
            setIsLoading(false)
          }
        }
        if(query.length < 3){
          setMovies([])
          setError("")
          return
        }
        fetchData()
        return ()=> controller.abort()
      },[query])
  return {
    isLoading,
    error,
    movies
  }
}
