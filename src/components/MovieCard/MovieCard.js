import React from 'react'
import './MovieCard.css'
import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postFavorite } from '../../thunks/postFavorite.js'
import { deleteFavorite } from '../../thunks/deleteFavorite.js'
import { toggleFavorite } from '../../actions/index.js'
import PropTypes from 'prop-types'



export class MovieCard extends Component {

  checkSignedIn = () => {
    if (this.props.userId === '') {
      this.props.history.push(`/login`)
    } else {
      const isFavorite = this.props.movies.find(movie => {
        return movie.movieId === this.props.movieId
      })
      if(!isFavorite.favorite) {
        this.props.addFavorite(this.props.movieId, this.props.userId, this.props.title, this.props.posterPath, this.props.releaseDate, this.props.voteAverage, this.props.overview)
        this.props.toggleFavorite(this.props.title)
      } else {
        this.props.toggleFavorite(this.props.title)
        this.props.deleteFavorite(this.props.userId, this.props.movieId)
      }
    }
  }

  render() {
   const favoriteIcon = this.props.favorite ? '../images/full-popcorn.svg' : '../images/empty-popcorn.svg'
    return (
      <article className='movie-card'>
        <img className='movie-img' src={this.props.posterPath} alt='movie poster' />
        <div className='movie-info-text'>
          <div className='movie-icon-container'>
            <svg className='movie-rating-chart' viewBox="0 0 36 36">
              <path className='outline-circle'
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeDasharray="100, 100"               
              />
              <path className='circle'
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeDasharray={`${this.props.voteAverage * 10}, 100`}               
              />
              <text textAnchor="middle" x="17" y="22" className='movie-rating'>{this.props.voteAverage}</text>
            </svg>
            <img className='popcorn-icon' src={favoriteIcon} alt='full popcorn' onClick={() => this.checkSignedIn()} />
          </div>
          <h3 className='movie-title'>{this.props.title}</h3>
          <p className='movie-release'>{this.props.releaseDate}</p>
          <div className='movie-description'>
            {this.props.overview}
          </div>
        </div>
      </article>
    )
  }
}

MovieCard.propTypes = {
  addFavorite: PropTypes.func.isRequired, 
  toggleFavorite: PropTypes.func.isRequired, 
  deleteFavorite: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired, 
  userId: PropTypes.number
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

