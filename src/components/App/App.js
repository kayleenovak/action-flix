import React, { Component } from 'react';
import SignUp from '../../containers/SignUp/SignUp'
import './App.css';
import { Route } from 'react-router-dom'
import { NoMatch } from '../NoMatch/NoMatch'
import  MovieContainer  from '../../containers/MovieContainer/MovieContainer'
import Header from '../../containers/Header/Header'; 


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
        <Route component={NoMatch} />
      </div>
    );
  }
}


export default App;
