import React from 'react'
import { useId } from 'react'

import '../../sass/UI/auth-input.scss'

function AuthInput({ type, img }, ref) {
  const id = useId()
  return (
    <label htmlFor={id} className="auth-input">
      <img src={img} alt="input" />
      <input
        type={type}
        minLength={type === 'password' ? 6 : Infinity}
        name={type}
        id={id}
        placeholder={type}
        ref={ref}
        required
      />
    </label>
  )
}

export default React.forwardRef(AuthInput)
