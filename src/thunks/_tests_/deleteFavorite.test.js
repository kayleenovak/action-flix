import { deleteFavorite } from '../deleteFavorite'
import { isLoading, hasErrored } from '../../actions'

describe('deleteFavorite', () => {
  let mockDispatch
  let mockUserId
  let mockMovieId

  beforeEach(() => {
    mockDispatch = jest.fn()
    mockUserId = 1
    mockMovieId = 297802
  })

  it('should call dispatch with isLoading(true)', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        user_id: mockUserId,
        movie_id: mockMovieId
      })
    }))

    const thunk = deleteFavorite(mockUserId, mockMovieId)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'there\'s been a fetch error'
    }))

    const thunk = deleteFavorite(mockUserId, mockMovieId)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(true))
  })

  it('should dispatch isLoading(false) if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'there\'s been a fetch error'
    }))

    const thunk = deleteFavorite(mockUserId, mockMovieId)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })
})
