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
    const thunk = postFavorite(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })
})