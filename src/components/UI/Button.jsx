import React from 'react'

import '../../sass/UI/button.scss'

function Button({ type, children, onClick }, ref) {
  return (
    <button type={type} className="button" onClick={onClick} ref={ref}>
      {children}
    </button>
  )
}

export default React.forwardRef(Button)
