import React from 'react'
import { shallow, mount } from 'enzyme'
import { SignUp, mapStateToProps, mapDispatchToProps } from './SignUp'
import { getUser } from '../../thunks/signIn.js'
import { createUser } from '../../thunks/createUser.js'
import { hasErrored } from '../../actions'
import { Redirect } from 'react-router-dom'

describe('SignUp', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<SignUp user={0} hasErrored={ false } checkUserLogin={ jest.fn() } createNewUser={ jest.fn() } />)

    expect(wrapper).toMatchSnapshot();
  });

  describe('handleChange', () => {
    let wrapper
    let mockEvent

    beforeEach(() => {
      wrapper = shallow(<SignUp user={0} hasErrored={ false } checkUserLogin={ jest.fn() } createNewUser={ jest.fn() } />)
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
        showSignIn: true,
        disableButton: true
      }

      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state()).toEqual(expected)
    })

    it('should invoke enableButtons', () => {
      const mockFunction = jest.fn()
      wrapper.enableButtons = mockFunction
      wrapper.instance().handleChange(mockEvent)

      expect(mockFunction).toHaveBeenCalled

    })
  })

  describe('enableButtons', () => {
    it('should toggle the disableButton value in state if showSignIn is true', () => {
      const mockState = {
        name: '',
        email: 't',
        password: 't',
        showSignIn: true,
        disableButton: true
      }
      const expected = {
        name: '',
        email: 't',
        password: 't',
        showSignIn: true,
        disableButton: false
      }
      const wrapper = shallow(<SignUp user={0} hasErrored={ false } checkUserLogin={ jest.fn() } createNewUser={ jest.fn() } />)

      wrapper.setState(mockState)
      wrapper.instance().enableButtons()

      expect(wrapper.state()).toEqual(expected)
    })

    it('should toggle the disableButton value in state if showSignIn is false', () => {
      const mockState = {
        name: 't',
        email: 't',
        password: 't',
        showSignIn: false,
        disableButton: true
      }
      const expected = {
        name: 't',
        email: 't',
        password: 't',
        showSignIn: false,
        disableButton: false
      }
      const wrapper = shallow(<SignUp user={0} hasErrored={ false } checkUserLogin={ jest.fn() } createNewUser={ jest.fn() } />)

      wrapper.setState(mockState)
      wrapper.instance().enableButtons()

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
      wrapper = shallow(<SignUp user={mockId} hasErrored={ false } checkUserLogin={ mockLogin } createNewUser={ mockCreateUser } />)
    })

    it('should invoke handleSubmit on click of signIn button', () => {
      const wrapper = shallow(<SignUp user={-0} hasErrored={ false } checkUserLogin={ mockLogin } createNewUser={ mockCreateUser } />)
      
      wrapper.setState({
        disableButton: false
      })
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
        showSignIn: true,
        disableButton: true
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
      const wrapper = shallow(<SignUp user={1} errorAction={ jest.fn() } hasErrored={ false } checkUserLogin={ mockLogin } createNewUser={ mockCreateUser } />)
      const mockState = {
        name: '',
        email: '',
        password: '',
        showSignIn: true,
        disableButton: true
      }
      const expected = {
        name: '',
        email: '',
        password: '',
        showSignIn: false,
        disableButton: true
      }

      wrapper.instance().handleSignUp(mockEvent)

      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('render', () => {
    let mockEvent
    let mockLogin
    let mockCreateUser
    let wrapper
    let mockUser

    beforeEach(() => {
      mockEvent = {
        target: {},
        preventDefault: () => {}
      }
      mockUser = 1
      mockLogin = jest.fn()
      mockCreateUser = jest.fn()
      wrapper = shallow(<SignUp user={-0} hasErrored={ true } checkUserLogin={ mockLogin } createNewUser={ mockCreateUser } errorAction={ jest.fn() }/>)
    })

    it('should render an h3 if this.props.hasErrored is true', () => {

      expect(wrapper.find('.error-message').length).toBe(1)
    })

    it('should return a Redirect if this.props.user', () => {
      const wrapper = shallow(<SignUp user={mockUser} hasErrored={ true } checkUserLogin={ mockLogin } createNewUser={ mockCreateUser } errorAction={ jest.fn() }/>)

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

    it('should call dispatch on errorAction with the correct params', () => {
      mappedProps.errorAction(false)

      expect(mockDispatch).toHaveBeenCalledWith(hasErrored(false))
    })
  })
})