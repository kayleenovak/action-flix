import React from 'react'
import './MovieCard.css'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postFavorite } from '../../thunks/postFavorite.js'
import { deleteFavorite } from '../../thunks/deleteFavorite.js'
import { toggleFavorite } from '../../actions/index.js'
import PropTypes from 'prop-types'



export const MovieCard = (props) => {

  const checkSignedIn = () => {
    if (props.userId === '') {
      props.history.push(`/login`)
    } else {
      const isFavorite = props.movies.find(movie => {
        return movie.movieId === props.movieId
      })
      if(!isFavorite.favorite) {
        props.addFavorite(props.movieId, props.userId, props.title, props.posterPath, props.releaseDate, props.voteAverage, props.overview)
      }
      props.toggleFavorite(props.title)
      props.deleteFavorite(props.userId, props.movieId)
    }
  }

  let favoriteIcon = props.favorite ? '../images/full-popcorn.svg' : '../images/empty-popcorn.svg'
  return (
    <article className='movie-card'>
      <img className='movie-img' src={props.posterPath} alt='movie poster' />
      <div className='movie-info-text'>
        <div className='movie-icon-container'>
          <p className='movie-rating'>{props.voteAverage}</p>
          <img src={favoriteIcon} alt='full popcorn' onClick={() => checkSignedIn()} />
        </div>
        <h3 className='movie-title'>{props.title}</h3>
        <p className='movie-release'>{props.releaseDate}</p>
        <p className='movie-description'>{props.overview}</p>
      </div>
    </article>
  )
}

MovieCard.propTypes = {
  addFavorite: PropTypes.func.isRequired, 
  toggleFavorite: PropTypes.func.isRequired, 
  deleteFavorite: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired
}


export const mapDispatchToProps = (dispatch) => ({
  addFavorite: (movieId, userId, title, posterPath, releaseDate, voteAverage, overview) => dispatch(postFavorite(movieId, userId, title, posterPath, releaseDate, voteAverage, overview)),
  toggleFavorite: (movieTitle) => dispatch(toggleFavorite(movieTitle)),
  deleteFavorite: (userId, movieId) => dispatch(deleteFavorite(userId, movieId))
})

export const mapStateToProps = (state, props) => ({
  movies: state.movies,
  userId: state.userId,
  movieId: props.movieId, 
  title: props.title, 
  posterPath: props.posterPath, 
  releaseDate: props.releaseDate, 
  voteAverage: props.voteAverage, 
  overview: props.overview, 
  favorite: props.favorite
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieCard))