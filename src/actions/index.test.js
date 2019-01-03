import * as actions from './index'

describe('actions', () => {
  it('should return a type of IS_LOADING, with isLoading', () => {
    const isLoading = true
    const expected = {
      type: 'IS_LOADING',
      isLoading
    }

    const result = actions.isLoading(isLoading)

    expect(result).toEqual(expected)
  })

  it('should return a type of HAS_ERRORED, with an id', () => {
    const hasErrored = false
    const expected = {
      type: 'HAS_ERRORED',
      hasErrored
    }

    const result = actions.hasErrored(hasErrored)

    expect(result).toEqual(expected)
  })

  it('should return a type of FETCH_DATA_SUCCESS, with a filter', () => {
    const movies = []
    const expected = {
      type: 'FETCH_DATA_SUCCESS',
      movies
    }

    const result = actions.fetchDataSuccess(movies)

    expect(result).toEqual(expected)
  })

  it('should return a type of SIGN_IN with an id', () => {
    const id = 1
    const expected = {
      type: 'SIGN_IN',
      id
    }

    const result = actions.signIn(id)

    expect(result).toEqual(expected)
  })

  it('should return a type of LOG_OUT', () => {
    const expected = {
      type: 'LOG_OUT'
    }

    const result = actions.logOut()

    expect(result).toEqual(expected)
  })

  it('should return a type of TOGGLE_FAVORITE with a movie title', () => {
    const movieTitle = 'Aquaman'
    const expected = {
      type: 'TOGGLE_FAVORITE',
      movieTitle
    }

    const result = actions.toggleFavorite(movieTitle)

    expect(result).toEqual(expected)
  })

  it('should return a type of RESET_FAVORITES', () => {
    const expected = {
      type: 'RESET_FAVORITES'
    }

    const result = actions.resetFavorites()

    expect(result).toEqual(expected)
  })
})
