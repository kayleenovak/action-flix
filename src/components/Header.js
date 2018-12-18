import React, { Component } from 'react'; 

class Header extends Component {
  constructor() {
    super() 
    this.state = {
      loginSelected: false
    }
  }

  render() {
    return (
      <header>
        <h1>Action Flix</h1>
        <button>Login</button>
      </header>
    )
  }
}

export default Header; 