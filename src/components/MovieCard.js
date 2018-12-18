import React from 'react'

export const MovieCard = ({title, rating, releaseDate, description}) => {
  return (
    <article>
      <p>{rating}</p>
      <h3>{title}</h3>
      <p>{releaseDate}</p>
      <p>{description}</p>
    </article>
  )
}