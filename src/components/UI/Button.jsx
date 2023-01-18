import React from 'react'

import '../../sass/UI/button.scss'

function Button({ type, children, onClick }) {
  return (
    <button type={type} className="button" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
