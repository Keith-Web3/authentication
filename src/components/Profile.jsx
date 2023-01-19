import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { motion } from 'framer-motion'

import { auth } from './Data/firebase'
import logo from '../assets/devchallenges.svg'
import '../sass/profile.scss'
import settings from '../assets/gear-solid.svg'
import Button from './UI/Button'

function Profile() {
  const data = useSelector(({ user }) => JSON.parse(user))
  const navigate = useNavigate()

  return (
    <motion.div
      className="profile"
      transition={{ type: 'tween', duration: 1.5 }}
      exit={{ opacity: 0, x: '-100vw' }}
    >
      <div className="container">
        <header>
          <img src={logo} alt="logo" />
          <img
            className="profileimg profileimg--small"
            src={data.photoURL}
            alt="profile image"
          />
          <div className="settings">
            <img src={settings} alt="settings" />
            <p>settings</p>
          </div>
        </header>
        <Outlet />
      </div>
    </motion.div>
  )
}

export default Profile
