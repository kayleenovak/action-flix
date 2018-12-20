import React from 'react'
import { shallow, mount } from 'enzyme'
import { SignUp } from './SignUp'

describe('SignUp', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<SignUp />)

    expect(wrapper).toMatchSnapshot();
  });
})