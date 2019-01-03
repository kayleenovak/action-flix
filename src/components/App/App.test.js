import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { MemoryRouter, Switch, Route } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store';
import { MovieContainer } from '../MovieContainer/MovieContainer'
import { SignUp } from '../SignUp/SignUp'
import { App } from './App';

describe('App', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<App />)

    expect(wrapper).toMatchSnapshot();
  });

  it('should route to main page', () => {
    const initialState = {};
    const mockStore = configureStore();
    let store = mockStore(initialState)
    const mockMovies = [{title: 'Aquaman'}]

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Switch>
            <Route path='/' render={() => <MovieContainer fetchMovies={ jest.fn() } getFavorites={ jest.fn() } userId={1} isLoading={ false } hasErrored={ false } movies={ mockMovies } location='/' />} />
          </Switch>
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper.find(MovieContainer).length).toBe(1)
  })
})


