import { fetchMovies } from '../fetchMovies'
import { isLoading, hasErrored } from '../../actions'

describe('fetchMovies', () => {
  let mockUrl
  let mockDispatch

  beforeEach(() => {
    mockUrl = 'www.moviesurl.com'
    mockDispatch = jest.fn()
  })


  it('should call dispatch with isLoading(true)', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {title: 'cool movie', rating: 3},
        {title: 'cooler movie', rating: 4},
        {title: 'coolest movie', rating: 5}
      ])
    }))    

    const thunk = fetchMovies(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'there\'s been a fetch error'
    }))

    const thunk = fetchMovies(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('there\'s been a fetch error'))
  })

  it('should call cleanMovies with correct params', async () => {
    const mockMovies = [
      {title: 'cool movie', rating: 3},
      {title: 'cooler movie', rating: 4},
      {title: 'coolest movie', rating: 5}
    ]

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {title: 'cool movie', rating: 3},
        {title: 'cooler movie', rating: 4},
        {title: 'coolest movie', rating: 5}
      ])
    }))     
    
    const thunk = fetchMovies(mockUrl) 
    
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(cleanMovies(mockMovies))  
  })

  it('should dispatch staffFetchDataSuccess', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {title: 'cool movie', rating: 3},
        {title: 'cooler movie', rating: 4},
        {title: 'coolest movie', rating: 5}
      ])
    })) 

    const thunk = fetchMovies(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(staffFetchDataSuccess())
  })
})