import React from 'react'

function ProfileInputs({ title, data, image }) {
  return (
    <tr>
      <td>
        <p>{title}</p>
      </td>
      <td>{image || <p>{data}</p>}</td>
    </tr>
  )
}

export default ProfileInputs
