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
    let favoriteWrapper
    let mockUser
    let mockMovieId
    let noUserWrapper

    beforeEach(() => {
      mockUser = 1
      mockMovieId = 1
      const mockTitle = 'Aquaman'
      const mockPosterPath = 'www.thismovie.com'
      const mockReleaseDate = '12/12/18'
      const mockVoteAverage = 7.5
      const mockOverview = 'About this movie'
      const mockHistory = []
      const mockFavorite = false
      const mockAddFavorite = jest.fn()
      const mockDeleteFavorite = jest.fn()
      const mockToggleFavorite = jest.fn()
      const mockMovies = [{
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
      const mockFavoriteMovies = [{
        title: 'Aquaman', 
        movieId: 1, 
        posterPath: 'www.thismovie.com', 
        releaseDate: '12/12/18',
        voteAverage: 7.5,
        overview: 'About this movie',
        favorite: true
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
      wrapper = shallow(<MovieCard 
                          movies={mockMovies} 
                          userId={mockUser} 
                          movieId={mockMovieId} 
                          title={mockTitle} 
                          posterPath={mockPosterPath} 
                          releaseDate={mockReleaseDate} 
                          voteAverage={mockVoteAverage} 
                          overview={mockOverview}
                          favorite={mockFavorite} 
                          addFavorite={mockAddFavorite} 
                          deleteFavorite={mockDeleteFavorite} 
                          toggleFavorite={mockToggleFavorite} 
                        />)
      noUserWrapper = shallow(<MovieCard userId='' history={mockHistory} />)
      favoriteWrapper = shallow(<MovieCard 
                          movies={mockFavoriteMovies} 
                          userId={mockUser} 
                          movieId={mockMovieId} 
                          title={mockTitle} 
                          posterPath={mockPosterPath} 
                          releaseDate={mockReleaseDate} 
                          voteAverage={mockVoteAverage} 
                          overview={mockOverview} 
                          addFavorite={mockAddFavorite} 
                          deleteFavorite={mockDeleteFavorite} 
                          toggleFavorite={mockToggleFavorite} 
                        />)
      wrapper.checkSignedIn = jest.fn()
    })

    it('should invoke checkSignedIn when the favorite', () => {
      wrapper.find('.popcorn').simulate('click')

      expect(wrapper.checkSignedIn).toHaveBeenCalled
    })

    it('should render an empty popcorn svg if the favorite is false', () => {
      const popcornImage = wrapper.find('.popcorn')

      expect(popcornImage.prop('src')).toEqual('../images/empty-popcorn.svg')
    })

    it('should redirect to the login page if there is no user', () => {
      noUserWrapper.instance().checkSignedIn()

      expect(noUserWrapper.instance().props.history).toEqual(['/login'])
    })

    it('should call addFavorite if the movie is not a favorite', () => {
      wrapper.instance().checkSignedIn()

      expect(wrapper.instance().props.addFavorite).toHaveBeenCalledWith(1, 1, 'Aquaman', 'www.thismovie.com', '12/12/18', 7.5, 'About this movie')
    })

    it('should call toggleFavorite', () => {
      wrapper.instance().checkSignedIn()

      expect(wrapper.instance().props.toggleFavorite).toHaveBeenCalledWith('Aquaman')
    })

    it('should call toggleFavorite if the movie is a favorite', () => {
      wrapper.checkSignedIn = jest.fn()
      favoriteWrapper.instance().checkSignedIn()

      expect(favoriteWrapper.instance().props.toggleFavorite).toHaveBeenCalledWith('Aquaman')
    })

    it('should call deleteFavorite if the movie is a favorite', () => {
      wrapper.checkSignedIn = jest.fn()
      favoriteWrapper.instance().checkSignedIn()

      expect(favoriteWrapper.instance().props.deleteFavorite).toHaveBeenCalledWith(1, 1)
    })
  })
  
  describe('mapStateToProps', () => {
    it('should return and object with the keys of movies, userId, movieId, title, posterPath, releaseDate, voteAverage, overview, favorite', () => {
      const mockState = {
        movies: [{
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
      }],
      userId: 1
      }
      const mockProps = {
        movieId: 1, 
        title: 'Aquaman', 
        posterPath: 'www.thismovie.com', 
        releaseDate: '12/12/18', 
        voteAverage: 7.5, 
        overview: 'About this movie', 
        favorite: false
      }
      const expected = {
        movies: mockState.movies,
        userId: mockState.userId,
        movieId: mockProps.movieId, 
        title: mockProps.title, 
        posterPath: mockProps.posterPath, 
        releaseDate: mockProps.releaseDate, 
        voteAverage: mockProps.voteAverage, 
        overview: mockProps.overview, 
        favorite: mockProps.favorite
      }
      const result = mapStateToProps(mockState, mockProps)

      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('should call dispatch with the correct params', () => {
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      const mockUser = 1
      const mockMovieId = 1
      const mockTitle = 'Aquaman'
      const mockPosterPath = 'www.thismovie.com'
      const mockReleaseDate = '12/12/18'
      const mockVoteAverage = 7.5
      const mockOverview = 'About this movie'

      mappedProps.addFavorite(mockMovieId, mockUser, mockTitle, mockPosterPath, mockReleaseDate, mockVoteAverage, mockOverview)

      expect(mockDispatch).toHaveBeenCalled
    })

    it('should call dispatch with the correct params', () => {
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      const mockTitle = 'Aquaman'

      mappedProps.toggleFavorite(mockTitle)

      expect(mockDispatch).toHaveBeenCalled
    })

    it('should call dispatch with the correct params', () => {
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      const mockUser = 1
      const mockMovieId = 1

      mappedProps.deleteFavorite(mockUser, mockMovieId)

      expect(mockDispatch).toHaveBeenCalled
    })
  })
})