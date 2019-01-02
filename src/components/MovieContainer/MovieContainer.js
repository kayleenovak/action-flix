import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MovieCard from '../MovieCard/MovieCard'
import './MovieContainer.css'
import { connect } from 'react-redux'
import { fetchMovies } from '../../thunks/fetchMovies.js'
import { movieDataBaseKey }  from '../../../src/constants.js'
import { getFavorites } from '../../thunks/getFavorites.js'
import PropTypes from 'prop-types'



export class MovieContainer extends Component {
async componentDidMount() {
  let apiKey = movieDataBaseKey
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`
  await this.props.fetchMovies(url, this.props.userId)
}

render() {
  if (this.props.movies.length && this.props.location === '/') {
    const actionMovies = this.props.movies.map(movie => (<MovieCard {...movie} />))
    return (
      <div className='movie-container action-movies'>
        {actionMovies}
      </div>
    )
  } else if (this.props.movies.length && this.props.location === '/favorites') {
      const favoriteMovies = this.props.movies.filter(movie => {
        return movie.favorite === 'true'
      }).map(movie => {
        return <MovieCard {...movie} />
      })
      return (
        <div className='movie-container favorite-movies'>
          {favoriteMovies}
        </div>
      )
    } 
    else {
      return <div>{'error'}</div>
    }
  }
}

MovieContainer.propTypes = {
  fetchMovies: PropTypes.func.isRequired, 
  getFavorites: PropTypes.func.isRequired, 
  userId: PropTypes.string.isRequired, 
  isLoading: PropTypes.bool.isRequired, 
  hasErrored: PropTypes.bool.isRequired, 
  movies: PropTypes.array.isRequired
}

export const mapStateToProps = (state) => {
  return {
  userId: state.userId,
  movies: state.movies,
  isLoading: state.isLoading,
  hasErrored: state.hasErrored
}}

export const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (url, userId) => dispatch(fetchMovies(url, userId)),
  getFavorites: (userId) => dispatch(getFavorites(userId)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer)
