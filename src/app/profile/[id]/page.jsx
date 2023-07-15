import React from 'react'

const ProfileId = ({params}) => {
  return (
    <div className='absolute top-1/2 right-1/2'>
        <p>yourname is {params.id}</p>
    </div>
  )
}

export default ProfileId