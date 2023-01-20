import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { onAuthStateChanged } from 'firebase/auth'

import { actions } from './components/store/AuthState'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import Profile from './components/Profile'
import Popup from './components/UI/Popup'
import EditProfile from './components/Utils/EditProfile'
import MainProfile from './components/Utils/MainProfile'
import './sass/index.scss'
import { auth } from './components/Data/firebase'
import Settings from './components/Settings'
let timer

function App() {
  const errMessage = useSelector(state => state.errorMessage)
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(actions.submit({ user, error: null }))
        navigate('/profile')
      }
    })
  }, [])

  useEffect(() => {
    timer = setTimeout(() => {
      dispatch(actions.resetErrorMessage(''))
    }, 3100)

    return () => clearTimeout(timer)
  }, [errMessage])

  return (
    <AnimatePresence>
      {errMessage && <Popup key={nanoid()} message={errMessage} />}
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {isLoggedIn && (
          <>
            <Route path="/profile" element={<Profile />}>
              <Route path="/profile" element={<MainProfile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
            </Route>
            <Route path="/settings" element={<Settings />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
