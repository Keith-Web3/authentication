import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'

import { auth } from './Data/firebase'
import logo from '../assets/devchallenges.svg'
import '../sass/profile.scss'
import Button from './UI/Button'

function Profile() {
  const data = useSelector(({ user }) => JSON.parse(user))
  const navigate = useNavigate()

  return (
    <div className="profile">
      <div className="container">
        <header>
          <img src={logo} alt="logo" />
          <img
            className="profileimg profileimg--small"
            src={data.photoURL}
            alt="profile image"
          />
          <Button
            onClick={() => {
              signOut(auth)
              navigate('/login')
            }}
          >
            Logout
          </Button>
        </header>
        <Outlet />
      </div>
    </div>
  )
}

export default Profile
