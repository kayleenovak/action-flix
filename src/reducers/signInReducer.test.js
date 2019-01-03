import { signInReducer } from './signInReducer'
import * as actions from '../actions'

describe('signInReducer', () => {
  it('should return default state', () => {
    const expected = ''

    const result = signInReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should update state with user id on sign in', () => {
    const id = 2
    const expected = id

    const result = signInReducer('', actions.signIn(id))

    expect(result).toEqual(expected)
  })

  it('should update state with new user id on new sign in', () => {
    const id = 4
    const expected = id

    const result = signInReducer('', actions.signIn(id))

    expect(result).toEqual(expected)
  })

  it('should update state with empty user id on log out', () => {
    const id = 6
    const expected = ''

    const result = signInReducer(id, actions.logOut())

    expect(result).toEqual(expected)
  })
})
