import React, { Component } from 'react'
import { getUser } from '../../thunks/signIn.js'
import { connect } from 'react-redux'

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
    const { email, password } = this.state
    this.props.checkUserLogin(email, password)
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
        !showSignIn ? <input name="name" value={name} placeholder='Enter name ...' onChange={ this.handleChange } /> : ''
      }
        <input name="email" value={email} placeholder='Enter email ...' onChange={ this.handleChange } />
        <input name="password" value={password} placeholder='Enter password ...' onChange={ this.handleChange } />
        <button className='submit-sign-up'>SUBMIT</button>
      </form> 
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkUserLogin: (email, password) => dispatch(getUser(email, password))
})

export default connect(null, mapDispatchToProps)(SignUp)