import React, { Component } from 'react';
import SignUp from '../SignUp/SignUp'
import './App.css';
import { Route } from 'react-router-dom'
import  MovieContainer  from '../MovieContainer/MovieContainer'
import Header from '../Header/Header'; 


export class App extends Component {
  constructor() {
    super()
    this.state = {
      loginSelected: false
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" render={() => <MovieContainer location='/' />}/>
        <Route exact path='/login' component={ SignUp }/>
        <Route exact path='/favorites' render={() => <MovieContainer location='/favorites' />} />
      </div>
    );
  }
}


export default App;
