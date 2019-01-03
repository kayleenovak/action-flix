import { postFavorite } from '../postFavorite'
import { isLoading, hasErrored, newUser } from '../../actions/index.js'

describe('postFavorite', () => {
  let mockUrl 
  let mockDispatch
  beforeEach(() => {
    mockUrl = 'http://localhost:3000/api/users/favorites/new'
    mockDispatch = jest.fn()
  })
  it('calls dispatch with isLoading action', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    
    const thunk = postFavorite(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })
  it('should dispatch hasErrored(true) if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false, 
      statusText: 'Unable to add favorite'
    }))

    const thunk = postFavorite(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(true))
  })
  it('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    const thunk = postFavorite(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })
})