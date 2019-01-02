import { isLoading, hasErrored, fetchDataSuccess } from '../actions/index.js'
import { cleanMovies } from '../cleaners/cleanMovies.js'
import { getFavorites } from './getFavorites'

export const fetchMovies = (url, userId) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.statusText)
      }      
      dispatch(isLoading(false))
      const movies = await response.json()
      let favorites 
      if (userId) {
        favorites = await dispatch(getFavorites(userId))
      }
      const currentMovies = await cleanMovies(movies, favorites)
      dispatch(fetchDataSuccess(currentMovies))
    } catch (error) {
      dispatch(hasErrored(true))
    }
  }
}