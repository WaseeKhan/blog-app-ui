import React from 'react'
import Base from '../components/Base'
import userContext from '../context/userContext'

const About = () => {
  return (
    <userContext.Consumer>
      {(object) =>(
        <Base>
        <h1>This is About Page</h1>
        {console.log(object)}
        <h1>Welcome user: {object.user.login && object.user.data.name}</h1>
        </Base>
      )}
    </userContext.Consumer>
  )
}

export default About