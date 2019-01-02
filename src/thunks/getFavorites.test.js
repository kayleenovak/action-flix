import { getFavorites } from '../getFavorites'
import { isLoading, hasErrored } from '../../actions'

describe('getFavorites', () => {
  let mockUrl
  let mockDispatch

  beforeEach(() => {
    mockUrl = 'www.getfavorites.com'
    mockDispatch = jest.fn()
  })

  it('should call dispatch with isLoading(true)', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {title: 'Aquaman'},
        {title: 'Captain America'}
      ])
    }))

    const thunk = getFavorites(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should call dispatch with isLoading(false)', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {title: 'Aquaman'},
        {title: 'Captain America'}
      ])
    }))

    const thunk = getFavorites(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should call dispatch with hasErrored(true) is error is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }))

    const thunk = getFavorites(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(true))
  })
})