import React, { useRef } from 'react'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'
import { submit } from '../store/AuthState'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import emailImg from '../../assets/envelope-solid.svg'
import passwordImg from '../../assets/lock-solid.svg'
import logo from '../../assets/devchallenges-light.svg'
import AuthInput from '../UI/AuthInput'
import Button from '../UI/Button'
import googleImg from '../../assets/Google.svg'
import facebookImg from '../../assets/Facebook.svg'
import twitterImg from '../../assets/Twitter.svg'
import githubImg from '../../assets/Github.svg'
import '../../sass/Auth/form-template.scss'
const keys = ['GOOGLE', 'FACEBOOK', 'TWITTER', 'GITHUB']

function FormTemplate({ children, button, footer, type }) {
  const dispatch = useDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  const submitHandler = function (type) {
    return function (e) {
      e.preventDefault()

      dispatch(
        submit({
          type,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          navigate,
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
      exit={{ opacity: 0, x: '-100vw' }}
    >
      <img src={logo} alt="logo" />
      {children}
      <AuthInput type="email" img={emailImg} ref={emailRef} />
      <AuthInput type="password" img={passwordImg} ref={passwordRef} />
      <Button type="submit">{button}</Button>
      <p>or continue with these social profile</p>
      <div className="social-profiles">
        {[googleImg, facebookImg, twitterImg, githubImg].map((img, idx) => (
          <img
            src={img}
            alt="social"
            key={nanoid()}
            onClick={submitHandler(keys[idx])}
          />
        ))}
      </div>
      {footer}
    </motion.form>
  )
}

export default FormTemplate
