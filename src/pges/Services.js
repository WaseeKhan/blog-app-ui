import React from 'react'
import Base from '../components/Base'
import userContext from '../context/userContext'

const Services = () => {
  return (
   <userContext.Consumer>
    {
      (user)=>(

        <Base>
        <div>
            <h1>This is Services </h1>
            <h1>Hi {user.name}</h1>
        </div>
      </Base>

      )
    }
  
   </userContext.Consumer>
  )
}

export default Services