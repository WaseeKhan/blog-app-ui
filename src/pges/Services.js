import React, { useEffect } from 'react'
import Base from '../components/Base'
import userContext from '../context/userContext'

const Services = () => {
  useEffect(()=>{
    document.title = "Artikance : Services "
  })

  return (
   <userContext.Consumer>
    {
      (user)=>(

        <Base>
        <div>
            <h1>This is Services </h1>
            <h1>Hi {user.user.login && user.user.data.name}</h1>
        </div>
      </Base>

      )
    }
  
   </userContext.Consumer>
  )
}

export default Services