import React from 'react'
import { shallow } from 'enzyme'
import { MovieCard } from './MovieCard'

describe('MovieCard', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<MovieCard />)

    expect(wrapper).toMatchSnapshot();
  });

  describe('checkSignedIn', () => {
    let wrapper
    let mockMovies

    beforeEach(() => {
      wrapper = shallow(<MovieCard movies={mockMovies}/>)
      mockMovies = [{title: 'Aquaman'}, {}]
    })
    it('if the user clicks on an image, it should invoke checkSignedIn', () => {
      wrapper.find('.favorite-icon').simulate('click')
      expect(wrapper.checkSignedIn).toHaveBeenCalled
    })

    it('if the user is signed in')
  })
})