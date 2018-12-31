import { createUser } from '../createUser'
import { isLoading, hasErrored, newUser } from '../../actions/index.js'

describe('createUser', () => {
  let mockUrl
  let mockId
  let mockDispatch
  beforeEach(() => {
    mockUrl = 'http://localhost:3000/api/users/favorites/new'
    mockId = 1
    mockDispatch = jest.fn()
  })
  it('calls dispatch with isLoading action', async () => {
    const thunk = createUser(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })
  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false, 
      statusText: 'Unable to create account'
    }))

    const thunk = createUser(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(true))
  })
  it('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    const thunk = createUser(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })
})