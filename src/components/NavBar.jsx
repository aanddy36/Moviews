import React, { useEffect, useRef } from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import popcorn from "../images/popcorn.png"

export const NavBar = ({query, setQuery, amount}) => {
  const inputEl = useRef(null)
  useEffect(()=>{
    const callback = (e)=>{
      if(e.code === "Enter"){
        inputEl.current.focus()
      }
    }
    document.addEventListener("keydown", callback)
    return ()=> document.removeEventListener("keydown", callback)
  },[])
  return (
    <nav className="nav-bar">
        <div className="logo">
          <img src={popcorn} className='img'/><h1>Moviews</h1>
        </div>
        <input className="search" type="text" placeholder="Search movies..." value={query}
          onChange={(e) => setQuery(e.target.value)} ref={inputEl}/>
        <p className="num-results"> Found <strong>{amount}</strong> results</p>
        <div className='social-logos'>
          <a className='social-logo' href='https://github.com/aanddy36?tab=repositories'><FaGithub/></a>
          <a className='social-logo' href='https://www.linkedin.com/in/delchiaroa/'><FaLinkedin/></a>
        </div>
      </nav>
  )
}
