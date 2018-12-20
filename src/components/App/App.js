import React, { Component } from 'react';
import { SignUp } from '../SignUp/SignUp'
import './App.css';
import { Route } from 'react-router-dom'
import  MovieContainer  from '../MovieContainer/MovieContainer'
import { Header } from '../Header/Header'; 


export class App extends Component {
  constructor() {
    super()
    this.state = {
      loginSelected: false
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify({email: 'tman2272@aol.com', password: 'password'}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const userInfo = await response.json()
    console.log(userInfo)

  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" render={() => <MovieContainer movies={this.state.movies}/>}/>
        <Route exact path='/login' component={ SignUp }/>
      </div>
    );
  }
}


export default App;
