import React from 'react'
import './MovieCard.css'
import { connect } from 'react-redux'


export const MovieCard = ({title, posterPath, releaseDate, voteAverage, overview, props}) => {
  return (
    <article className='movie-card'>
      <img className='movie-img' src={posterPath} alt='movie poster' />
      <div className='movie-info-text'>
        <div className='movie-icon-container'>
          <p className='movie-rating'>{voteAverage}</p>
          <img src='../images/full-popcorn.svg' alt='full popcorn' onClick={() => props.addFavorite(movieId, props.userId, title, posterPath, releaseDate, voteAverage, overview)} />
        </div>
        <h3 className='movie-title'>{title}</h3>
        <p className='movie-release'>{releaseDate}</p>
        <p className='movie-description'>{overview}</p>
      </div>
    </article>
  )

  export const mapDispatchToProps = (dispatch) => ({
    addFavorite: () => dispatch(postFavorite(movieId, userId, title, posterPath, releaseDate, voteAverage, overview))
  })

  export const mapStateToProps = (state) => ({
    userId: state.userId
  })

  export default connect(mapStateToProps, mapDispatchToProps)(MovieCard)
}