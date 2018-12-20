import React, { Component } from 'react'

export class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '', 
      email: '', 
      password: '',
      showSignIn: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      name: '',
      email: '',
      password: ''
    })
  }

  render() {
    const {name, email, password, showSignIn} = this.state
    return (
      <form onSubmit={ this.handleSubmit }>
      {
        !showSignIn ? <input name="name" value={name} onChange={ this.handleChange } /> : ''
      }
        <input name="email" value={email} onChange={ this.handleChange } />
        <input name="password" value={password} onChange={ this.handleChange } />
        <button className='submit-sign-up'>SUBMIT</button>
      </form> 
    )
  }
}