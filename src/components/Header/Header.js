import React, { Component } from 'react'; 
import { connect } from 'react-redux'
import { logOut } from '../../actions/index.js'
import { NavLink } from 'react-router-dom'
import './Header.css'
import PropTypes from 'prop-types'

export class Header extends Component {
  constructor() {
    super()
    this.state = {
      listOpen: false
    }
  }

  toggleList = () => {
    this.setState({
      listOpen: !this.state.listOpen
    })
  }

  render() {
    const arrowIcon = this.state.listOpen ? '../images/up-arrow.svg' : '../images/down-arrow.svg'

    const notLoggedIn = (
      <header className='header'>
        <NavLink to='/' className='header-title-navlink' ><h1 className='header-title'>Action Flix</h1></NavLink>
        <NavLink to='/login'><button className='login-btn'>Login</button></NavLink>
      </header>   
    )
  
    const loggedIn = (
      <header className="header">
        <h1 className='header-title'>Action Flix</h1>
          <div className='dropdown-wrapper'>
            <div className='dropdown-header'>
              <div className='dropdown-title'>
                <h3 className='welcome-user' onClick={() => this.toggleList()}>Hello {this.props.name}</h3>
                <img className='arrow-icon' src={arrowIcon} alt='down arrow' />
              </div>
            </div>
            { !this.state.listOpen ?  null : 
              <article className='dropdown-list'>
                <NavLink to='/favorites'><button className='favorites-btn'>Favorites</button></NavLink>
                <button className='logout-btn' onClick={() => this.props.logUserOut()}>Sign Out</button>
              </article>
              
            }
          </div>
      </header>
    )
    if (this.props.user) {
       return loggedIn
    }
    return (
        notLoggedIn 
    )
  }
}


Header.proptypes = {
  logOut: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  user: state.userId,
  name: state.userName
})

export const mapDispatchToProps = (dispatch) => ({
  logUserOut: () => dispatch(logOut())
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Header)

  