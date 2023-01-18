import React from 'react'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getDocs, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import Button from '../UI/Button'
import { auth, database } from '../Data/firebase'
import ProfileInputs from './ProfileInputs'

function MainProfile() {
  const navigate = useNavigate()
  const data = useSelector(({ user }) => JSON.parse(user))
  const [dbData, setdbData] = useState({})
  const collectionRef = collection(database, 'profiles')

  useEffect(() => {
    getDocs(collectionRef).then(res => {
      res.docs.forEach(doc => {
        doc.id === auth.currentUser.uid && setdbData(doc.data())
      })
    })
  }, [])

  const tableData = [
    {
      title: 'PHOTO',
      image: data.photoURL ? (
        <img
          className="profileimg profileimg--large"
          src={data.photoURL}
          alt="profile image"
        />
      ) : (
        <p>NOT SET</p>
      ),
    },
    {
      title: 'NAME',
      data: data.displayName || 'NOT SET',
    },
    {
      title: 'PHONE',
      data: dbData.phone || 'NOT SET',
    },
    {
      title: 'BIO',
      data: dbData.bio || 'NOT SET',
    },
    {
      title: 'Email',
      data: data.email || 'olorunnisholaolamilekan@gmail.com',
    },
    {
      title: 'Password',
      data: '*'.repeat(data.password?.length || 8),
    },
  ]
  return (
    <>
      <h1>Personal info</h1>
      <p>Basic info, like your name and photo</p>
      <div className="table-head">
        <h2>Profile</h2>
        <p>Some info may be visible to other people</p>
        <Button type="button" onClick={() => navigate('/profile/edit')}>
          Edit
        </Button>
      </div>
      <table>
        <tbody>
          {tableData.map(el => (
            <ProfileInputs {...el} key={nanoid()} />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default MainProfile
