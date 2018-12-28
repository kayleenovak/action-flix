import React from 'react'
import './MovieCard.css'
import { connect } from 'react-redux'
import { postFavorite } from '../../thunks/postFavorite.js'


export const MovieCard = (props) => {
  return (
    <article className='movie-card'>
      <img className='movie-img' src={props.posterPath} alt='movie poster' />
      <div className='movie-info-text'>
        <div className='movie-icon-container'>
          <p className='movie-rating'>{props.voteAverage}</p>
          <img src='../images/full-popcorn.svg' alt='full popcorn' onClick={() => props.addFavorite(props.movies, props.movieId, props.userId, props.title, props.posterPath, props.releaseDate, props.voteAverage, props.overview)} />
        </div>
        <h3 className='movie-title'>{props.title}</h3>
        <p className='movie-release'>{props.releaseDate}</p>
        <p className='movie-description'>{props.overview}</p>
      </div>
    </article>
  )
}

export const mapDispatchToProps = (dispatch) => ({
  addFavorite: (movieId, userId, title, posterPath, releaseDate, voteAverage, overview) => dispatch(postFavorite(movieId, userId, title, posterPath, releaseDate, voteAverage, overview))
})

export const mapStateToProps = (state, props) => ({
  movies: state.movies,
  userId: state.userId,
  movieId: props.movieId, 
  title: props.title, 
  posterPath: props.posterPath, 
  releaseDate: props.releaseDate, 
  voteAverage: props.voteAverage, 
  overview: props.overview
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard)