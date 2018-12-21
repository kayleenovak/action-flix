import React from 'react'
import { shallow, mount } from 'enzyme'
import { SignUp } from './SignUp'

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
    it('should', () => {
      
    })
  })
})