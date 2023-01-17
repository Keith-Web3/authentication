import React from 'react'
import { nanoid } from 'nanoid'

import logo from '../assets/devchallenges.svg'
import profile from '../assets/profile.jpg'
import Button from './UI/Button'
import ProfileInputs from './Utils/ProfileInputs'
import '../sass/profile.scss'

function Profile() {
  const tableData = [
    {
      title: 'PHOTO',
      image: (
        <img
          className="profileimg profileimg--large"
          src={profile}
          alt="profile image"
        />
      ),
    },
    {
      title: 'NAME',
      data: 'Xandea Neal',
    },
    {
      title: 'BIO',
      data: 'I am a software developer....',
    },
    {
      title: 'Email',
      data: 'xanthe.neal@gmail.com',
    },
    {
      title: 'Password',
      data: '************',
    },
  ]

  return (
    <div className="profile">
      <div className="container">
        <header>
          <img src={logo} alt="logo" />
          <img
            className="profileimg profileimg--small"
            src={profile}
            alt="profile image"
          />
        </header>
        <h1>Personal info</h1>
        <p>Basic info, like your name and photo</p>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>
                <h2>Profile</h2>
                <p>Some info may be visible to other people</p>
                <Button type="button">Edit</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(el => (
              <ProfileInputs {...el} key={nanoid()} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Profile
