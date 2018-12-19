import React from 'react'
import './MovieCard.css'

export const MovieCard = ({poster, title, rating, releaseDate, description}) => {
  return (
    <article className='movie-card'>
      <img className='movie-img' src={poster} alt='movie poster' />
      <div className='movie-info-text'>
        <div className='movie-icon-container'>
          <p className='movie-rating'>{rating}</p>
          <img src='../images/full-popcorn.svg' alt='full popcorn' />
        </div>
        <h3 className='movie-title'>{title}</h3>
        <p className='movie-release'>{releaseDate}</p>
        <p className='movie-description'>{description}</p>
      </div>
    </article>
  )
}