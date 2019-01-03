import React from 'react'
import { shallow, mount } from 'enzyme'
import { Header } from './Header'
import { mapDispatchToProps } from './Header';
import { logOut } from '../../actions/index.js'

describe('Header', () => {
  let wrapper
  let mockLogOut
  beforeEach(() => {
    mockLogOut = jest.fn()
    const mockUser = 1
    wrapper = shallow(<Header resetFavorites={ jest.fn() } logUserOut={ mockLogOut } user={mockUser} />)
  })

  it('should match the snapshot', () => {
    
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle a click event', () => {
    wrapper.setState({listOpen: true})
    wrapper.find('.logout-btn').simulate('click')
    
    expect(mockLogOut).toHaveBeenCalled
  })

  it('should setState once toggleList has been invoked', async () => {
    wrapper.instance().toggleList()

    expect(wrapper.state().listOpen).toEqual(true)
  })

  it('should invoke toggleList on click of the user name', () => {
    wrapper.find('.dropdown-title').simulate('click')

    expect(wrapper.toggleList).toHaveBeenCalled
  })

  it('should return notLogged in if this.props.user does not exist', () => {
    const wrapper = shallow(<Header logUserOut={ mockLogOut } user='' />)

    expect(wrapper.find('div').length).toBe(0)
  })

  it('should return notLogged in if this.props.user does not exist', () => {
    expect(wrapper.find('div').length).toBe(3)
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch on logUserOut with the correct params', () => {
      const mockDispatch = jest.fn() 
      const expected = {
        type: 'LOG_OUT'
      }

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.logUserOut()

      expect(mockDispatch).toHaveBeenCalledWith(expected)

    })

    it('should call dispatch on resetFavorites with the correct params', () => {
      const mockDispatch = jest.fn() 
      const expected = {
        type: 'RESET_FAVORITES'
      }

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.resetFavorites()

      expect(mockDispatch).toHaveBeenCalledWith(expected)

    })
  });
})