import React from 'react'
import { shallow, mount } from 'enzyme'
import { Header } from './Header'
import { mapDispatchToProps } from '../MovieContainer/MovieContainer';

describe('Header', () => {
  let wrapper
  let mockLogOut
  beforeEach(() => {
    mockLogOut = jest.fn()
    wrapper = shallow(<Header logOutUser={ mockLogOut }/>)
  })
  it('should match the snapshot', () => {
    
    expect(wrapper).toMatchSnapshot();
  });
  describe('mapDispatchToProps', () => {
    it('should call dispatch when action is dipatched', () => {
      const mockDispatch = jest.fn()
      const isLoggedOut = mapDispatchToProps(mockDispatch)
      
      expect(isLoggedOut).toHaveBeencalled

    })
  })

  it.skip('should handle a click event that will log out our user', () => {

  })
})