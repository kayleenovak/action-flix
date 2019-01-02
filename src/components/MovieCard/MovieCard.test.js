import React from 'react'
import { shallow } from 'enzyme'
import { MovieCard, mapStateToProps, mapDispatchToProps } from './MovieCard'

describe('MovieCard', () => {
  it('should match the snapshot', () => {
    let mockMovies = [{title: 'Aquaman'}, {title: 'Transformers'}]
    let mockUser = 1
    const wrapper = shallow(<MovieCard movies={mockMovies} userId={mockUser} />)

    expect(wrapper).toMatchSnapshot();
  });

  describe('checkSignedIn', () => {
    let wrapper
    let mockMovies
    let mockUser
    let mockMovieId
    let mockAddFavorite
    let mockDeleteFavorite
    let mockToggleFavorite


    beforeEach(() => {
      mockUser = 1
      mockMovieId = 1
      mockAddFavorite = jest.fn()
      mockDeleteFavorite = jest.fn()
      mockToggleFavorite = jest.fn()
      mockMovies = [{
        title: 'Aquaman', 
        movieId: 1, 
        posterPath: 'www.thismovie.com', 
        releaseDate: '12/12/18',
        voteAverage: 7.5,
        overview: 'About this movie',
        favorite: false
      }, 
      {
        title: 'Transformers', 
        movieId: 2, 
        posterPath: 'www.thismovie.com', 
        releaseDate: '12/12/18',
        voteAverage: 7.5,
        overview: 'About this movie',
        favorite: false
      }]
      wrapper = shallow(<MovieCard movies={mockMovies} userId={mockUser} movieId={mockMovieId} addFavorite={mockAddFavorite} deleteFavorite={mockDeleteFavorite} toggleFavorite={mockToggleFavorite} />)
    })

    it('should invoke checkSignedIn when the favorite', () => {
      wrapper.checkSignedIn = jest.fn()
      wrapper.find('.popcorn').simulate('click')

      expect(wrapper.checkSignedIn).toHaveBeenCalled
    })

    it('should call addFavorite if the movie is not a favorite', () => {
      wrapper.checkSignedIn = jest.fn()
      wrapper.instance().checkSignedIn()

      expect(wrapper.addFavorite).toHaveBeenCalled
    })

    it('should call toggleFavorite', () => {
      wrapper.checkSignedIn = jest.fn()
      wrapper.instance().checkSignedIn()

      expect(wrapper.toggleFavorite).toHaveBeenCalled
    })

    it('should call deleteFavorite', () => {
      wrapper.checkSignedIn = jest.fn()
      wrapper.instance().checkSignedIn()

      expect(wrapper.deleteFavorite).toHaveBeenCalled
    })
  })
})