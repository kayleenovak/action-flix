import React from 'react'
import { MovieCard } from './MovieCard'

export const MovieContainer = ({ movies }) => {
  const actionMovies = movies.map(movie => (<MovieCard {...movie} />))

  return (
    <div>
      {actionMovies}
    </div>
  )
}