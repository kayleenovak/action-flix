import React from 'react'
import { shallow, mount } from 'enzyme'
import { Header } from './Header'
import { mapDispatchToProps } from '../MovieContainer/MovieContainer';

describe('Header', () => {
  let wrapper
  let mockLogOut
  beforeEach(() => {
    mockLogOut = jest.fn()
    wrapper = shallow(<Header logUserOut={ mockLogOut }/>)
  })
  it('should match the snapshot', () => {
    
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle a click event', () => {
    wrapper.find('.logout-btn').simulate('click')
    window.alert('clicked')

    expect(mockLogOut).toHaveBeenCalled
  })
  describe('mapDispatchToProps', () => {
    it('should call dispatch when action is dipatched', () => {
      const mockDispatch = jest.fn()
      const isLoggedOut = mapDispatchToProps(mockDispatch)
      
      expect(mockDispatch).toHaveBeenCalled

    })
  });
})