import { getUserNameReducer } from './getUserNameReducer'
import * as actions from '../actions'
import { getMaxListeners } from 'cluster';


describe('getUserNameReducer', () => {
  it('should return default state', () => {
    const expected = ''

    const result = getUserNameReducer(undefined, {})

    expect(result).toEqual(expected)
  })
  it('should update state with a username on successful sign in', () => {
    const id = 2
    const name = 'Lonzo'
    const userName = 'born2ball@gmail.com'
    const expected = name

    const result = getUserNameReducer('', actions.signIn(id, name, userName))

    expect(result).toEqual(expected)
  })
})