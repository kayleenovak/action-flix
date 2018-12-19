import React from 'react'
import { MovieCard } from '../MovieCard/MovieCard'
import './MovieContainer.css'

export const MovieContainer = ({ movies }) => {
  const actionMovies = movies.map(movie => (<MovieCard {...movie} />))

  return (
    <div className='movie-container'>
      {actionMovies}
    </div>
  )
}