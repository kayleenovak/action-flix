import React from 'react'
import { Redirect } from 'react-router-dom'

export const NoMatch = () => {
  return <Redirect to='/' />
}