import React from 'react'
import { shallow, mount } from 'enzyme'
import { MovieContainer, mapStateToProps, mapDispatchToProps } from './MovieContainer';
import { fetchMovies } from '../../thunks/fetchMovies.js';

describe('MovieContainer', () => {
  let wrapper
  let mockFetch
  let mockMovies

  beforeEach(() => {
    mockMovies = [{name: 'Aquaman'}]
    mockFetch = jest.fn()
    wrapper = shallow(<MovieContainer movies={ mockMovies } isLoading={ false } hasErrored={ false } fetchMovies={ mockFetch }/>)
  }) 
  it('should match the snapshot', () => {
    
    expect(wrapper).toMatchSnapshot()
  })

  it('should render an empty div if there are no movies in props', () => {

    expect(wrapper.find('div').length).toEqual(1)
  })

  describe('componentDidMount', () => {
    it('should call fetchMovies with the correct params', () => {
      const url = 'https://api.themoviedb.org/3/discover/movie?api_key=8d54c10134c07bfb8e01ded9e30524be&with_genres=28'
      let mockMovies = [{name: 'Aquaman'}]
      let mockFetch = jest.fn()
      let wrapper = shallow(<MovieContainer movies={ mockMovies } isLoading={ false } hasErrored={ false } fetchMovies={ mockFetch } />)
      
      wrapper.instance().componentDidMount()

      expect(mockFetch).toHaveBeenCalledWith(url)      
    })
  })

  describe('mapStateToProps', () => {
    it('should return and object with the keys of movies, isLoading, and hasErrored', () => {
      const mockState = {
        movies: [{name: 'Aquaman'}],
        isLoading: false,
        hasErrored: false
      }
      const expected = {
        movies: [{name: 'Aquaman'}],
        isLoading: false,
        hasErrored: false
      }

      const result = mapStateToProps(mockState)

      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params', () => {
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      const url = 'www.getthemovies.com'

      mappedProps.fetchMovies(url)

      expect(mockDispatch).toHaveBeenCalled
    })
  })
})



