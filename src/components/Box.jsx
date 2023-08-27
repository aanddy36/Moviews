import React, { useEffect, useState } from 'react'

export const Box = ({children, movie, message}) => {
    const [isOpen, setIsOpen] = useState(true);
    useEffect(()=>{
      setIsOpen(true)
    },[movie])
  return (
    <div className="box">
          {movie && <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>{isOpen ? `-` : "+"}</button>}
          {isOpen ? children : <p className="descrp">{message}</p>}
        </div>
  )
}
