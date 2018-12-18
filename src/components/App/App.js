import React, { Component } from 'react';
import * as API from '../../apiCalls/apiCalls.js'
import './App.css';
import { MovieContainer } from '../MovieContainer'
import { Header } from '../Header'; 

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      loginSelected: false
    }
  }

  async componentDidMount() {
    const movies = await API.getFilms()
    this.setState({
      movies
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <MovieContainer movies={ this.state.movies } />
      </div>
    );
  }
}

export default App;
