import { createUser } from '../createUser'
import { isLoading, hasErrored, signIn } from '../../actions/index.js'


describe('createUser', () => {
  let mockUrl
  let mockId
  let mockDispatch
  beforeEach(() => {
    mockUrl = 'http://localhost:3000/api/users/favorites/new'
    mockId = 3
    mockDispatch = jest.fn()
  })
  it('calls dispatch with isLoading action', async () => {
    const thunk = createUser(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })
  it('should dispatch hasErrored(true) if the response is not ok', async () => {
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
  it('should dispatch newUser if our response is ok', async () => {
    const mockUser = {
      name: 'Jim', 
      password: 'password', 
      email: 'jim@ymail.com', 
      id: 3
    }
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true, 
      json: () => Promise.resolve(mockUser)
    }))

    const thunk = createUser(mockUser.name, mockUser.email, mockUser.password)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(signIn(mockId, mockUser.name))
  })
})