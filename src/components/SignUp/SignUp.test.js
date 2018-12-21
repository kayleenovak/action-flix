import React from 'react'
import { shallow, mount } from 'enzyme'
import { SignUp, mapStateToProps, mapDispatchToProps } from './SignUp'

describe('SignUp', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<SignUp />)

    expect(wrapper).toMatchSnapshot();
  });

  describe('handleChange', () => {
    let wrapper
    let mockEvent

    beforeEach(() => {
      wrapper = shallow(<SignUp />)
      mockEvent = {
        target: {
          name: 'email',
          value: 't'
        }
      }
    })

    it('should invoke handleChange when a change occurs on an input', () => {
      wrapper.handleChange = jest.fn()

      wrapper.find('.email-input').simulate('change', mockEvent)

      expect(wrapper.handleChange).toHaveBeenCalled
    })

    it('should update state when handleChange is invoked', () => {
      const expected = {
        name: '',
        email: 't',
        password: '',
        showSignIn: true
      }

      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('handleSubmit', () => {
    let mockEvent
    let wrapper
    let mockLogin
    let mockCreateUser
    let mockId

    beforeEach(() => {
      mockEvent = {
        target: {},
        preventDefault: () => {}
      }
      mockLogin = jest.fn()
      mockCreateUser = jest.fn()
      mockId = 1
      wrapper = shallow(<SignUp hasErrored={ false } checkUserLogin={ mockLogin } createNewUser={ mockCreateUser } />)
    })

    it('should invoke handleSubmit on click of signIn button', () => {
      wrapper.find('.submit-sign-up').simulate('click', mockEvent)

      expect(wrapper.handleSubmit).toHaveBeenCalled
    })

    it('should invoke checkUserLogin with the correct params if showSignIn is true', () => {
      wrapper.setState({email: 'this@email.com', password: 'password'})
      wrapper.instance().handleSubmit(mockEvent)

      expect(mockLogin).toHaveBeenCalledWith('this@email.com', 'password')
    })

    it('should invoke createNewUser with the correct params if showSignIn is false', () => {
      wrapper.setState({email: 'this@email.com', password: 'password', name: 'Ryan', showSignIn: false})
      wrapper.instance().handleSubmit(mockEvent)

      expect(mockCreateUser).toHaveBeenCalledWith('Ryan', 'this@email.com', 'password')
    })

    it('should reset state', () => {
      const mockState = {
        name: 'Ryan',
        email: 'this@email.com',
        password: 'password'
      }
      const expected = {
        name: '',
        email: '',
        password: '',
        showSignIn: true
      }

      wrapper.setState(mockState)
      wrapper.instance().handleSubmit(mockEvent)

      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('handleSignUp', () => {
    it('should setState', () => {
      const mockEvent = {
        target: {},
        preventDefault: () => {}
      }
      const mockLogin = jest.fn()
      const mockCreateUser = jest.fn()
      const wrapper = shallow(<SignUp hasErrored={ false } checkUserLogin={ mockLogin } createNewUser={ mockCreateUser } />)
      const mockState = {
        name: '',
        email: '',
        password: '',
        showSignIn: true
      }
      const expected = {
        name: '',
        email: '',
        password: '',
        showSignIn: false
      }

      wrapper.instance().handleSignUp(mockEvent)

      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('mapStateToProps', () => {
    it('should return an object with the keys user and hasErrored', () => {
      const mockState = {
        userId: 1,
        hasErrored: false,
        isLoading: false,
        movies: []
      }
      const expected = {
        user: 1,
        hasErrored: false
      }

      const result = mapStateToProps(mockState)

      expect(result).toEqual(expected)
    })
  })
})