import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { getUser } from '../../thunks/signIn.js'
import { createUser } from '../../thunks/createUser.js'
import { hasErrored } from '../../actions'
import { connect } from 'react-redux'
import './SignUp.css'
import PropTypes from 'prop-types'


export class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '', 
      email: '', 
      password: '',
      showSignIn: true, 
      disableButton: true
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    }, () => this.enableButtons())
  }

enableButtons = () => {
  if(this.state.showSignIn && this.state.email !== '' && this.state.password  !== '') {
    this.setState({
      disableButton: false
    })
  } else if (!this.state.showSignIn && this.state.email !== ''  && this.state.password !== '' && this.state.name !== '') {
    this.setState({
      disableButton: false
    })
  }
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
    this.props.errorAction(false)
  }

  render() {
    const {name, email, password, showSignIn} = this.state
    const signUpBtnName = showSignIn ? 'Sign In' : 'Sign Up'
    const newUserBtnName = showSignIn ? 'New user? Sign up!' : 'Log in'
    const popUpMessage = showSignIn ? 'Please Log In' : 'Create Account'
    const errorMessage = showSignIn ? 'email and password do not match' : 'email already exists'

    if (this.props.user) return <Redirect to='/' />
    return (
      <div className="form-container">
        <div className="inner-container">
          <article className="message-container">
            <h1>Welcome To Action Flix!</h1>
            <h3 className='popup-message'>{popUpMessage}</h3>
          </article>
          <form onSubmit={ this.handleSubmit }>
        {
          !showSignIn ? <input name="name" value={name} placeholder='Enter name ...' onChange={ this.handleChange } /> : ''
        }
          <input name="email" value={email} placeholder='Email address' onChange={ this.handleChange } className='email-input'/>
          <input name="password"  type="password" value={password} placeholder='Password' onChange={ this.handleChange } />
          <button className='submit-sign-up' disabled={this.state.disableButton} onClick={this.handleSubmit}>{signUpBtnName}</button>        
          <button className='signin-toggle' onClick={this.handleSignUp}>{newUserBtnName}</button>
          { this.props.hasErrored ? <h3>{errorMessage}</h3> : undefined }
          </form> 
        </div>
        <div className='login-side-page'>
          <div className='side-page-text'>
            <h2 className='login-page-title'>Action Flix</h2>
            <h3 className='slogan'>Everything you need to know in one place.</h3>
            <p className='description'>All-inclusive access to action films. Track your favorite movies. Stay up-to-date with new movies.</p>
          </div>
          <div className='circles-container'>
            <div className='circle-five'></div>
            <div className='circle-six'></div>
            <div className='circle-two'></div>
            <div className='circle-one'></div>
            <div className='circle-four'></div>
            <div className='circle-three'></div>
            <div className='large-circle'></div>
          </div>
        </div>
      </div>
    )
  }
}

SignUp.propTypes = {
  user: PropTypes.number.isRequired, 
  hasErrored: PropTypes.bool.isRequired, 
  checkUserLogin: PropTypes.func.isRequired, 
  createNewUser: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  user: state.userId,
  hasErrored: state.hasErrored
})

export const mapDispatchToProps = (dispatch) => ({
  checkUserLogin: (email, password) => dispatch(getUser(email, password)),
  createNewUser: (name, email, password) => dispatch(createUser(name, email, password)),
  errorAction: (bool) => dispatch(hasErrored(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

