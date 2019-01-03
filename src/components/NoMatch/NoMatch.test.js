import React from 'react'
import { shallow } from 'enzyme'
import { NoMatch } from './NoMatch'
import { Redirect } from 'react-router-dom'

describe('NoMatch', () => {
  it('should return a Redirect', () => {
    const wrapper = shallow(<NoMatch />)

    expect(wrapper.find(Redirect).length).toBe(1)
  })
})