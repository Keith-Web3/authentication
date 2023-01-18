import React, { useRef } from 'react'
import { nanoid } from 'nanoid'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage, database } from '../Data/firebase'
import { doc, setDoc, collection } from 'firebase/firestore'
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useId } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth } from '../Data/firebase'
import { actions } from '../store/AuthState'
import backImg from '../../assets/chevron-left-solid.svg'
import EditInput from '../UI/EditInput'
import '../../sass/Utils/edit-profile.scss'
import Button from '../UI/Button'

function EditProfile() {
  const navigate = useNavigate()
  const data = useSelector(({ user }) => JSON.parse(user))
  const [profileImg, setProfileImg] = useState(data.photoURL)
  const id = useId()
  const dispatch = useDispatch()

  const nameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const passwordRef = useRef()
  const bioRef = useRef()

  const inputData = [
    {
      type: 'text',
      name: 'Name',
      placeholder: 'Enter your name..',
      ref: nameRef,
    },
    { type: 'text', name: 'Bio', placeholder: 'Enter your bio..', ref: bioRef },
    {
      type: 'text',
      name: 'Phone',
      placeholder: 'Enter your number',
      ref: phoneRef,
    },
    {
      type: 'email',
      name: 'Email',
      placeholder: 'Enter your email..',
      ref: emailRef,
    },
    {
      type: 'password',
      name: 'Password',
      placeholder: 'Enter your pasword...',
      ref: passwordRef,
    },
  ]

  const onProfileChange = async function (e) {
    const image = e.target.files[0]
    if (image.type.slice(0, 5) !== 'image') {
      dispatch(actions.resetErrorMessage('The selected file is not an image'))
      return
    }
    const storageRef = ref(storage, `/images/${auth.currentUser.uid}`)
    const res = await uploadBytes(storageRef, image)
    const url = await getDownloadURL(res.ref)
    setProfileImg(url)
  }
  const handleProfileChange = async function (e) {
    e.preventDefault()

    // const collectionRef = collection(database, auth.currentUser.uid)

    try {
      const res = await updateProfile(auth.currentUser, {
        displayName: nameRef.current.value || data.displayName,
        bio: bioRef.current.value,
        photoURL: profileImg || data.photoURL,
      })
      function chooseValid() {
        bio = bioRef.current.value.trim() ? { bio: bioRef.current.value } : {}
        phone = phoneRef.current.value.trim()
          ? { phone: phoneRef.current.value }
          : {}
        return { ...bio, ...phone }
      }
      const res2 = await setDoc(
        doc(database, 'profiles', auth.currentUser.uid),
        chooseValid()
      )
      const res3 = await updateEmail(
        auth.currentUser,
        emailRef.current.value || data.email
      )
      const res4 = await updatePassword(
        auth.currentUser,
        passwordRef.current.value || data.password
      )
      dispatch(
        actions.resetErrorMessage('Your profile has been successful updated!')
      )
    } catch (err) {
      dispatch(actions.resetErrorMessage(err.message))
    }
  }

  return (
    <div className="edit-profile">
      <div className="back-btn" onClick={() => navigate(-1)}>
        <img src={backImg} alt="back" />
        <p>Back</p>
      </div>
      <form className="form" onSubmit={handleProfileChange}>
        <h2>Change info</h2>
        <p>Changes will be reflected in every services</p>
        <div className="image">
          <img src={profileImg} alt="profile" />
          <label htmlFor={id}>
            Change photo
            <input
              type="file"
              name="photo"
              id={id}
              onChange={onProfileChange}
            />
          </label>
        </div>
        {inputData.map(el => (
          <EditInput {...el} key={nanoid()} />
        ))}
        <Button>Save</Button>
      </form>
    </div>
  )
}

export default EditProfile
