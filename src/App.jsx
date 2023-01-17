import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login'

import SignUp from './components/Auth/SignUp'
import Profile from './components/Profile'
import './sass/index.scss'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </>
  )
}

export default App
