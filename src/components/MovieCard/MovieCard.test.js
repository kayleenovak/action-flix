import React from 'react'
import { shallow } from 'enzyme'
import { MovieCard } from './MovieCard'

describe('MovieCard', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<MovieCard />)

    expect(wrapper).toMatchSnapshot();
  });
})