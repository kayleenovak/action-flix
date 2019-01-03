import React from 'react'
import { shallow, mount } from 'enzyme'
import { MovieContainer, mapStateToProps, mapDispatchToProps } from './MovieContainer';
import { fetchMovies } from '../../thunks/fetchMovies.js';
import { MovieCard } from '../MovieCard/MovieCard'
import { movieDataBaseKey }  from '../../../src/constants.js'

describe('MovieContainer', () => {
  let apiKey
  let url
  let mockFetch
  let mockDispatch
  let mockMovies
  let wrapper
  let userId

  beforeEach(() => {
    apiKey = movieDataBaseKey
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`
    mockFetch = jest.fn()
    mockDispatch = jest.fn()
    mockMovies = [{name: 'Aquaman'}]
    userId = 1
    wrapper = shallow(<MovieContainer getFavorites={jest.fn()} userId={userId} movies={ mockMovies } isLoading={ false } hasErrored={ false } fetchMovies={ mockFetch } />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a no favorites message if there are no favorite movies on favorites page in props', () => {
    const mockMovies = []
    const wrapper = shallow(<MovieContainer getFavorites={jest.fn()} userId={ userId } movies={ mockMovies } isLoading={ false } hasErrored={ true } fetchMovies={ mockFetch } location={ '/favorites' } />)

    expect(wrapper.find('section').length).toEqual(1)
  })

  it('should render a 404 error if there are no movies in props', () => {
    const mockMovies = []
    const wrapper = shallow(<MovieContainer getFavorites={jest.fn()} userId={ userId } movies={ mockMovies } isLoading={ false } hasErrored={ true } fetchMovies={ mockFetch } />)

    expect(wrapper.find('h3').length).toEqual(1)
  })

  it('should render a loading message if there are no movies in props', () => {
    const mockMovies = []
    const wrapper = shallow(<MovieContainer getFavorites={jest.fn()} userId={ userId } movies={ mockMovies } isLoading={ true } hasErrored={ false } fetchMovies={ mockFetch } />)

    expect(wrapper.find('h1').length).toEqual(1)
  })

  describe('componentDidMount', () => {
    it('should call fetchMovies with the correct params', () => {
      wrapper.instance().componentDidMount()

      expect(mockFetch).toHaveBeenCalledWith(url, userId)      
    })
  })

  it('should render actionMovies when webpage is at home location', () => {
    wrapper = shallow(<MovieContainer location='/' getFavorites={jest.fn()} userId={userId} movies={ mockMovies } isLoading={ false } hasErrored={ false } fetchMovies={ mockFetch }/>)
    expect(wrapper.find('.action-movies').length).toBe(1)
  })

  it('should render favoriteMovies when webpage is at favorites location', () => {
    const mockMovies = [{name: 'Aquaman', favorite: true}, {name: 'Captain America', favorite: true}]
    wrapper = shallow(<MovieContainer location='/favorites' getFavorites={jest.fn()} userId={userId} movies={ mockMovies } isLoading={ false } hasErrored={ false } fetchMovies={ mockFetch }/>)
    
    expect(wrapper.find('.favorite-movies').length).toBe(1)
  })  

  describe('mapStateToProps', () => {
   it('should return an object with the keys of movies, isLoading, and hasErrored', () => {
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
     const mappedProps = mapDispatchToProps(mockDispatch)
     const mockUrl = 'www.getthemovies.com'

     mappedProps.fetchMovies(mockUrl)

     expect(mockDispatch).toHaveBeenCalled
   })

   it('should call dispatch with the correct params', () => {
     const mappedProps = mapDispatchToProps(mockDispatch)
     const mockId = 1

     mappedProps.getFavorites(mockId)

     expect(mockDispatch).toHaveBeenCalled
   })
 })
})