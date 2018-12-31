import { createUser } from '../createUser'
import { isLoading, hasErrored, newUser } from '../../actions/index.js'
jest.mock('../createUser')

describe('createUser', () => {
  let mockUrl
  let mockId
  let mockDispatch
  beforeEach(() => {
    mockUrl = 'http://localhost:3000/api/users/favorites/new'
    mockUserId = 1
    mockDispatch = jest.fn()
  })
  it('calls dispatch with isLoading action', () => {
    
  })
})