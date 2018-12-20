import React from 'react'
import { shallow, mount } from 'enzyme'
import MovieContainer from './MovieContainer';

describe('MovieContainer', () => {
  it('should match the snapshot', () => {
    let mockMovies = [{name: 'Aquaman'}]
    let mockFetch = jest.fn()
    let wrapper = shallow(<MovieContainer movies={ mockMovies } isLoading={ false } hasErrored={ false } fetchMovies={ mockFetch }/>)
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentDidMount', () => {
    it('should call fetchMovies with the correct params', async () => {
      let mockMovies = [{name: 'Aquaman'}]
      let mockFetch = jest.fn()
      const url = 'https://api.themoviedb.org/3/discover/movie?api_key=8d54c10134c07bfb8e01ded9e30524be&with_genres=28'
      let wrapper = shallow(<MovieContainer movies={ mockMovies } isLoading={ false } hasErrored={ false } fetchMovies={ mockFetch }/>)
      
      wrapper.instance().componentDidMount()

      expect(mockFetch).toHaveBeenCalledWith(url)
    })
  })
})



