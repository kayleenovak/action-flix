import { fetchMovies } from '../fetchMovies'
import { isLoading, hasErrored, fetchDataSuccess } from '../../actions/index.js'
import { movieDataBaseKey } from '../../constants.js'
import { movies } from '../../mockData.js'
import { getFavorites } from '../getFavorites'

jest.mock('../getFavorites')
const cleanMovies = require('../../cleaners/cleanMovies.js')



describe('fetchMovies', () => {
  let mockUrl 
  let mockDispatch 
  let cleanedMovies
  let userId

  beforeEach(() => {
    mockUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${movieDataBaseKey}&with_genres=28`
    mockDispatch = jest.fn()
    userId = 1
  })

  it('should call dispatch with isLoading(true)', () => {
    const thunk = fetchMovies(mockUrl, userId)

    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored with true if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: false,
        statusText: 'Something went wrong'
      }))

    const thunk = fetchMovies(mockUrl, userId)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(true))
  })

  it('should call dispatch with isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: true
    }))
    const thunk = fetchMovies(mockUrl, userId)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should call dispatch with getFavorites if there is a userId', async () => {
    window.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(movies)
    }))
    const thunk = fetchMovies(mockUrl, userId)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(getFavorites(userId))
  })

  it('should not call dispatch with getFavorites if there is not a userId', async () => {
    window.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(movies)
    }))
    userId = undefined

    const thunk = fetchMovies(mockUrl, userId)

    await thunk(mockDispatch)

    expect(mockDispatch).not.toHaveBeenCalledWith(getFavorites(userId))
  })

  it('should call cleanMovies with the correct params', async () => {
    window.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(movies)
    }))
    const thunk = fetchMovies(mockUrl, userId)

    cleanMovies.cleanMovies = jest.fn()
    await thunk(mockDispatch)

    expect(cleanMovies.cleanMovies).toHaveBeenCalled
  })

  it('should call fetchDataSuccess', async () => {
    window.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(movies)
    }))
    const thunk = fetchMovies(mockUrl, userId)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(fetchDataSuccess())
  })
})