import React, { useContext } from 'react'
import Base from '../../components/Base'
import userContext from '../../context/userContext'

const ProfileInfo = () => {
const user = useContext(userContext)
  return (

    <Base>
    <h1>This is Profile Page</h1>
    <h1>welcome {user.name}</h1>
    </Base>

  )
}

export default ProfileInfo