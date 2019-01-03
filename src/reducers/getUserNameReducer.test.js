import { getUserNameReducer } from './getUserNameReducer'

describe('getUserNameReducer', () => {
  it('should return default state', () => {
    const expected = ''

    const result = getUserNameReducer(undefined, {})

    expect(result).toEqual(expected)
  })
})