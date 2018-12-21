import React from 'react'
import { shallow, mount } from 'enzyme'
import { SignUp, mapStateToProps, mapDispatchToProps } from './SignUp'
import { getUser } from '../../thunks/signIn.js'
import { createUser } from '../../thunks/createUser.js'
import { Redirect } from 'react-router-dom'

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

  describe('render', () => {
    it('should render an h3 if this.props.hasErrored is true', () => {
      const mockEvent = {
        target: {},
        preventDefault: () => {}
      }
      const mockLogin = jest.fn()
      const mockCreateUser = jest.fn()
      const wrapper = shallow(<SignUp hasErrored={ true } checkUserLogin={ mockLogin } createNewUser={ mockCreateUser } />)

      expect(wrapper.find('h3').length).toBe(1)
    })

    it('should return a Redirect if this.props.user', () => {
            const mockEvent = {
        target: {},
        preventDefault: () => {}
      }
      const mockLogin = jest.fn()
      const mockCreateUser = jest.fn()
      const wrapper = shallow(<SignUp user='1' hasErrored={ true } checkUserLogin={ mockLogin } createNewUser={ mockCreateUser } />)

      expect(wrapper.find(Redirect).length).toBe(1)
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

  describe('mapDispatchToProps', () => {
    let mockDispatch
    let mappedProps
    let email
    let password
    let name

    beforeEach(() => {
      mockDispatch = jest.fn()
      mappedProps = mapDispatchToProps(mockDispatch)
      email = 'this@email.com'
      password = 'password'
      name = 'Ryan'
    })

    it('should call dispatch on checkUserLogin with the correct params', () => {
      mappedProps.checkUserLogin(email, password)

      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function))
    })

    it('should call dispatch on checkUserLogin with the correct params', () => {
      mappedProps.createNewUser(name, email, password)

      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function))
    })
  })
})