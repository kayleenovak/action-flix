import { hasErroredReducer } from './hasErroredREducer'
import * as actions from '../actions'

describe('hassErroredReducer', () => {
  it('should return default state', () => {
    const expected = false 

    const result = hasErroredReducer(undefined, {})

    expect(result).toEqual(expected)
  })
})