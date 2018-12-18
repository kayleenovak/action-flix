import React, { Component } from 'react';
import * as API from '../../apiCalls/apiCalls.js'
import './App.css';
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
    }, () => {
      console.log(this.state)
    })
  }

  render() {
    return (
      <div className="App">
        <Header/>
      </div>
    );
  }
}

export default App;
