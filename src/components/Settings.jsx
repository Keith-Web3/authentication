import React from 'react'
import ReactDOM from 'react-dom'
import { signOut, deleteUser, linkWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'

import { actions } from './store/AuthState'
import {
  auth,
  database,
  storage,
  googleProvider,
  githubProvider,
  twitterProvider,
  facebookProvider,
} from './Data/firebase'
import logo from '../assets/devchallenges-light.svg'
import backImg from '../assets/chevron-left-solid.svg'
import SocialProfiles from './Utils/SocialProfiles'
import Button from './UI/Button'
import Modal from './UI/Modal'
import '../sass/settings.scss'
import { useState } from 'react'

function Settings() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const deleteAccount = async function () {
    deleteDoc(doc(database, 'profiles', auth.currentUser.uid))
      .then(res => '')
      .catch(err => err)
    deleteObject(ref(storage, `images/${auth.currentUser.uid}`))
      .then(res => res)
      .catch(err => err)
    try {
      const res = await deleteUser(auth.currentUser)
      navigate('/login')
    } catch (err) {
      dispatch(actions.resetErrorMessage(err.message))
    }
  }

  const linkAccount = provider => {
    return async function () {
      try {
        const res = await linkWithPopup(auth.currentUser, provider)
        dispatch(actions.resetErrorMessage('Account linked sucessfully!'))
      } catch (err) {
        dispatch(actions.resetErrorMessage(err.message))
      }
    }
  }

  return (
    <div className="settings">
      <img src={logo} alt="logo" />
      <div className="back-btn" onClick={() => navigate(-1)}>
        <img src={backImg} alt="back" />
        <p>Back</p>
      </div>
      <div className="container">
        <p>Connect multiple providers</p>
        <SocialProfiles
          eventListener={linkAccount}
          keys={[
            googleProvider,
            facebookProvider,
            twitterProvider,
            githubProvider,
          ]}
        />
        <div className="button-container">
          <Button onClick={() => setShowModal(true)}>Delete account</Button>
          <Button
            onClick={() => {
              signOut(auth)
              navigate('/login')
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      {showModal &&
        ReactDOM.createPortal(
          <Modal action={deleteAccount} setShowModal={setShowModal}>
            Are you sure you want to delete your account?
          </Modal>,
          document.getElementById('root')
        )}
    </div>
  )
}

export default Settings
