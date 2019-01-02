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
      welcomeSelected: false
    }
  }

  render() {
    return (
      <header className='header'>
        <h1 className='header-title'>Action Flix</h1>
        <NavLink to='/login'><button className='login-btn'>Login</button></NavLink>
      </header>
    )
  }
}

Header.proptypes = {
  logOut: PropTypes.func.isRequired
}

export const mapDispatchToProps = (dispatch) => ({
  logUserOut: () => dispatch(logOut())
}) 

export default connect(null, mapDispatchToProps)(Header)

// const loggedIn = (
//   <header className="header">
//     <h1 className='header-title'>Action Flix</h1>
//       <div className='dropdown-wrapper'>
//         <div className='dropdown-header'>
//           <div className='dropdown-title'>
//             <h3 className='welcome-user'>Hello {username.toUpperCase()}</h3>
//           </div>
//         </div>
//         <article className='dropdown-list'>
//           <button className='logout-btn' onClick={() => props.logUserOut()}>Sign Out</button>
//           <NavLink to='/favorites'><button className='favorites-btn'>Favorites</button></NavLink>
//         </article>
//       </div>
//   </header>
// )
