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
})
