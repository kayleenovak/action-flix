import { hasErroredReducer } from './hasErroredReducer'

describe('hasErroredReducer', () => {
  it('should return default state', () => {
    const expected = false

    const result = hasErroredReducer(undefined, {})

    expect(result).toEqual(expected)
  })
  it('should update state if there is an error', () => {
    const action = {
      type: 'HAS_ERRORED',
      hasErrored: true
    }
    const expected = true

    const result = hasErroredReducer(false, action)

    expect(result).toEqual(expected)
  })
})
