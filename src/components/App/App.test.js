import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import App from './App';

describe('App', () => {
  it('should match the snapshot', () => {
    const Header = () => {
      return (
        <header className='header'>
          <h1 className='header-title'>Action Flix</h1>
          <button className='login-btn'>Login</button>
        </header>
      )
    }
    const Route = jest.fn()
    const movies = []

    const wrapper = shallow(
      <div className="App">
        <Header />
        <Route exact path="/" render={() => <MovieContainer movies={movies}/>}/>
      </div>
    )

    expect(wrapper).toMatchSnapshot();
  });
})


