import React from 'react'
import { nanoid } from 'nanoid'

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

function FormTemplate({ children, button, footer }) {
  return (
    <form className="form-template">
      <img src={logo} alt="logo" />
      {children}
      <AuthInput type="email" img={emailImg} />
      <AuthInput type="password" img={passwordImg} />
      <Button type="submit">{button}</Button>
      <p>or continue with these social profile</p>
      <div className="social-profiles">
        {[googleImg, facebookImg, twitterImg, githubImg].map(img => (
          <img src={img} alt="social" key={nanoid()} />
        ))}
      </div>
      {footer}
    </form>
  )
}

export default FormTemplate
