import { moviesReducer } from './moviesReducer'
import * as actions from '../actions'
import { movies } from '../../src/mockData.js'

describe('moviesReducer', () => {
  it('should return default state', () => {
    const expected = []

    const result = moviesReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should update state with movies requested if our fetch request is successful', () => {
    const mockMovies = movies.results
    const expected = mockMovies

    const result = moviesReducer([], actions.fetchDataSuccess(mockMovies))

    expect(result).toEqual(expected)
  })

  it('should toggle whether a movie is favorited or not', () => {
    const mockMovies = movies.results
    const mockFavoriteMovie = {
      movieId: 297802,
      posterPath: 'http://image.tmdb.org/t/p/w185//i2dF9UxOeb77CAJrOflj0RpqJRF.jpg',
      title: 'Aquaman',
      voteAverage: 6.9,
      releaseDate: '2018-12-07',
      overview: 'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.',
      favorite: false
    }

    const result = moviesReducer(mockMovies, actions.toggleFavorite(mockFavoriteMovie.title))

    expect(result[0].favorite).toEqual(true)
  })

  it('should update state with movies requested if our fetch request is successful', () => {
    const mockMovies = [{ title: 'Aquaman', favorite: true }]
    const expected = [{ title: 'Aquaman', favorite: false }]

    const result = moviesReducer(mockMovies, actions.resetFavorites())

    expect(result).toEqual(expected)
  })
})
