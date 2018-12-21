import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { getUser } from '../../thunks/signIn.js'
import { createUser } from '../../thunks/createUser.js'
import { connect } from 'react-redux'

export class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '', 
      email: '', 
      password: '',
      showSignIn: true
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
    const { name, email, password } = this.state
    if (this.state.showSignIn) {
      this.props.checkUserLogin(email, password)      
    } else {
      this.props.createNewUser(name, email, password)
    }

    this.setState({
      name: '',
      email: '',
      password: ''
    })
  }

  handleSignUp = (e) => {
    e.preventDefault()
    this.setState({showSignIn: !this.state.showSignIn})
  }

  render() {
    const {name, email, password, showSignIn} = this.state
    const signUpBtnName = showSignIn ? 'Sign In' : 'Sign Up'
    const newUserBtnName = showSignIn ? 'New user? Sign up!' : 'Log in instead'
    const errorMessage = showSignIn ? 'email and password do not match' : 'email already exists'

    if (this.props.user) return <Redirect to='/' />
    return (
      <form onSubmit={ this.handleSubmit }>
      {
        !showSignIn ? <input name="name" value={name} placeholder='Enter name ...' onChange={ this.handleChange } /> : ''
      }
        <input name="email" value={email} placeholder='Enter email ...' onChange={ this.handleChange } className='email-input'/>
        <input name="password" value={password} placeholder='Enter password ...' onChange={ this.handleChange } />
        <button className='submit-sign-up' onClick={this.handleSubmit}>{signUpBtnName}</button>        
        <button className='signin-toggle' onClick={this.handleSignUp}>{newUserBtnName}</button>
        { this.props.hasErrored ? <h3>{errorMessage}</h3> : undefined }
      </form> 
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.userId,
  hasErrored: state.hasErrored
})

export const mapDispatchToProps = (dispatch) => ({
  checkUserLogin: (email, password) => dispatch(getUser(email, password)),
  createNewUser: (name, email, password) => dispatch(createUser(name, email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

