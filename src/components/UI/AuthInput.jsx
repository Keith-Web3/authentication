import React from 'react'
import { useId } from 'react'

import '../../sass/UI/auth-input.scss'

function AuthInput({ type, img }) {
  const id = useId()
  return (
    <label htmlFor={id} className="auth-input">
      <img src={img} alt="input" />
      <input type={type} name={type} id={id} placeholder={type} />
    </label>
  )
}

export default AuthInput
