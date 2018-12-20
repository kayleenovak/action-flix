import { cleanMovies } from './cleaners.js'
import { movies } from '../../src/mockData.js'

describe('cleaners', () => {
  describe('cleanMovies', () => {
    it('should return an object with the data we want', () => {
      const mockMovie = movies
      const expected = {
        poster: `http://image.tmdb.org/t/p/w185/${mockMovie.results[0].poster_path}`, 
        title: mockMovie.results[0].title, 
        rating: mockMovie.results[0].vote_average,
        releaseDate: mockMovie.results[0].release_date, 
        description: mockMovie.results[0].overview 
      } 

      const result = cleanMovies(mockMovie)

      expect(result[0]).toEqual(expected)

    })
  })
})