import React, { Component } from 'react'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '', 
      email: '', 
      password: ''
    }
  }

  render() {
    const {name, email, password} = this.state
    return (
      <form>
        <input name="name" value={name}/>
        <input name="email" value={email}/>
        <input name="password" value={password}/>
        <button>SUBMIT</button>
      </form> 
    )
  }
}