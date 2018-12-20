import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

describe('Header', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(
      <header className='header'>
        <h1 className='header-title'>Action Flix</h1>
        <button className='login-btn'>Login</button>
      </header>
    ); 
    expect(wrapper).toMatchSnapshot();
  });
})