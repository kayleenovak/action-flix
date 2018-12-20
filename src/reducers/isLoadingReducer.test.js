import { isLoadingReducer } from './isLoadingReducer'
import * as actions from '../actions'

describe('isLoadingReducer', () => {
  it('should return default state', () => {
    const expected = false

    const result = isLoadingReducer(undefined, {})

    expect(result).toEqual(expected)
  })
  it('should update state if request is loading', () => {
    const action = {
      type: 'IS_LOADING', 
      isLoading: true
    }
    const expected = true

    const result = isLoadingReducer(false, action)

    expect(result).toEqual(expected)
  })
})