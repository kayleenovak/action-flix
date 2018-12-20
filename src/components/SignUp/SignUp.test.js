import React from 'react'
import { shallow } from 'enzyme'
import SignUp from './SignUp'

describe('SignUp', () => {
  it('should match the snapshot', () => {
    const showSignIn = true
    const name = 'name'
    const email = 'email'
    const password = 'password'

    const wrapper = shallow(
      <form onSubmit={jest.fn()}>
      {
        !showSignIn ? <input name="name" value={name} onChange={jest.fn()} /> : ''
      }
        <input name="email" value={email} onChange={jest.fn()} />
        <input name="password" value={password} onChange={jest.fn()} />
        <button className='submit-sign-up'>SUBMIT</button>
      </form> 
    )

    expect(wrapper).toMatchSnapshot();
  });
})