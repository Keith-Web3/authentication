import React from 'react'

import '../../sass/UI/button.scss'

function Button({ type, children }) {
  return (
    <button type={type} className="button">
      {children}
    </button>
  )
}

export default Button
