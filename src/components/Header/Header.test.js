import React from 'react'
import { shallow, mount } from 'enzyme'
import { Header } from './Header'
import { mapDispatchToProps } from '../MovieContainer/MovieContainer';
import { logOut } from '../../actions/index.js'

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

    expect(mockLogOut).toHaveBeenCalled
  })
  describe('mapDispatchToProps', () => {
    it('calls dispatch with a logOut action when the logout button is clicked', () => {
      const mockDispatch = jest.fn() 

      const mappedProps = mapDispatchToProps(mockDispatch)

      expect(mockDispatch).toHaveBeenCalled

    })
  });
})