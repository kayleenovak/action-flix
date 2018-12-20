import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
    if (this.props.user) return <Redirect to='/' />
    return (
      <form onSubmit={ this.handleSubmit }>
      {
        !showSignIn ? <input name="name" value={name} placeholder='Enter name ...' onChange={ this.handleChange } /> : ''
      }
        <input name="email" value={email} placeholder='Enter email ...' onChange={ this.handleChange } />
        <input name="password" value={password} placeholder='Enter password ...' onChange={ this.handleChange } />
        <button className='submit-sign-up'>SUBMIT</button>
        { this.props.hasErrored ? <h3>email and password do not match</h3> : undefined }
      </form> 
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userId,
  hasErrored: state.hasErrored
})

const mapDispatchToProps = (dispatch) => ({
  checkUserLogin: (email, password) => dispatch(getUser(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)