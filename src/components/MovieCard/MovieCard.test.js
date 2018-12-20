import React from 'react'
import { shallow } from 'enzyme'
import MovieCard from './MovieCard'

describe('MovieCard', () => {
  it('should match the snapshot', () => {
    const poster = 'movie poster'
    const rating = 9.0
    const title = 'Great Movie'
    const releaseDate = '09/12/19'
    const description = 'This is a great movie'
    
    const wrapper = shallow(
      <article className='movie-card'>
        <img className='movie-img' src={poster} alt='movie poster' />
        <div className='movie-info-text'>
          <div className='movie-icon-container'>
            <p className='movie-rating'>{rating}</p>
            <img src='../images/full-popcorn.svg' alt='full popcorn' />
          </div>
          <h3 className='movie-title'>{title}</h3>
          <p className='movie-release'>{releaseDate}</p>
          <p className='movie-description'>{description}</p>
        </div>
      </article> 
    )

    expect(wrapper).toMatchSnapshot();
  });
})