import { getUser } from './signIn'
import { isLoading, hasErrored, signIn } from './../actions'

describe('signIn', () => {
  let mockDispatch
  let email
  let password

  beforeEach(() => {
    mockDispatch = jest.fn()
    email = 'tman2272@aol.com'
    password = 'password'
  })

  it('should call dispatch with isLoading(true)', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        email: email,
        password: password
      })
    }))    

    const thunk = getUser(email, password)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })  

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'there\'s been a fetch error'
    }))

    const thunk = getUser(email, password)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(true))
  })

  it('should dispatch signIn with user.data.id', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        email: email,
        password: password
      })
    })) 

    const mockUserId = 1

    const thunk = getUser(email, password) 
    
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(signIn(mockUserId))        
  })    
})