import React, { Component } from 'react'; 
import './Header.css'

export const Header = () =>  {
    return (
      <header className='header'>
        <h1 className='header-title'>Action Flix</h1>
        <button className='login-btn'>Login</button>
      </header>
    )
}
