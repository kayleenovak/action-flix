import React, { Component } from 'react'; 
import { NavLink } from 'react-router-dom'
import './Header.css'

export const Header = () =>  {
    return (
      <header className='header'>
        <h1 className='header-title'>Action Flix</h1>
        <NavLink to='/login'><button className='login-btn'>Login</button></NavLink>
      </header>
    )
}
