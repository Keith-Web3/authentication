import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import logo from '../assets/devchallenges.svg'
import user from '../assets/user-solid.svg'
import '../sass/profile.scss'
import settings from '../assets/gear-solid.svg'

function Profile() {
  const data = useSelector(({ user }) => JSON.parse(user))
  const navigate = useNavigate()

  return (
    <motion.div className="profile">
      <div className="container">
        <header>
          <img src={logo} alt="logo" />
          <img
            className="profileimg profileimg--small"
            src={data.photoURL || user}
            alt="profile image"
          />
          <div className="settings" onClick={() => navigate('/settings')}>
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
