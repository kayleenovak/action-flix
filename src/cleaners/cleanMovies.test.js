import { cleanMovies } from './cleanMovies.js'
import { movies } from '../../src/mockData.js'

describe('cleaners', () => {
  describe('cleanMovies', () => {
    it('should return an object with the data we want', async () => {
      const mockMovie = movies
      const expected = {
        movieId: 297802 
        posterPath: `http://image.tmdb.org/t/p/w185/${mockMovie.results[0].poster_path}`, 
        title: mockMovie.results[0].title, 
        voteAverage: mockMovie.results[0].vote_average,
        releaseDate: mockMovie.results[0].release_date, 
        overview: mockMovie.results[0].overview,
        favorite: false, 
      } 

      const result = await cleanMovies(mockMovie)

      expect(result[0]).toEqual(expected)

    })
  })
})