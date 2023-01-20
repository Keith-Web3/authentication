import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { submit } from '../store/AuthState'
import emailImg from '../../assets/envelope-solid.svg'
import passwordImg from '../../assets/lock-solid.svg'
import logo from '../../assets/devchallenges-light.svg'
import AuthInput from '../UI/AuthInput'
import Button from '../UI/Button'
import '../../sass/Auth/form-template.scss'
import SocialProfiles from '../Utils/SocialProfiles'

function FormTemplate({ children, button, footer, type }) {
  const dispatch = useDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const isLoading = useSelector(state => state.isLoading)
  console.log(isLoading)

  const submitHandler = function (type) {
    return function (e) {
      e.preventDefault()

      dispatch(
        submit({
          type,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          navigate,
          isLoading,
        })
      )
    }
  }
  return (
    <motion.form
      className="form-template"
      onSubmit={submitHandler(type)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'tween', duration: 1 }}
      exit={{ x: '-100vw' }}
    >
      <img src={logo} alt="logo" />
      {children}
      <AuthInput type="email" img={emailImg} ref={emailRef} />
      <AuthInput type="password" img={passwordImg} ref={passwordRef} />
      <Button type="submit">{button}</Button>
      <p>or continue with these social profile</p>
      <SocialProfiles
        eventListener={submitHandler}
        keys={['GOOGLE', 'FACEBOOK', 'TWITTER', 'GITHUB']}
      />
      {footer}
    </motion.form>
  )
}

export default FormTemplate
