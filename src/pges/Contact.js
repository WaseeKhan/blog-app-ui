import React, { useEffect } from 'react'
import Base from '../components/Base'
import userContext from '../context/userContext'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'
import  moon from '../images/moon.mp4';

const Contact = () => {
  useEffect(()=>{
    document.title = "Artikance : Services "
  })

  return (
   <userContext.Consumer>
    {
      (user)=>(

        <Base>
        <div className="container">
          <Card>
            <CardHeader>
              <h1 className='text-center'>Contact Us</h1>
            </CardHeader>
            <CardBody>
            <video width="1050" height="300">
            <source src={moon} type="video/mp4" />

              Your browser does not support the video tag.
            </video>
            </CardBody>
          </Card>
          </div>
      </Base>

      )
    }
  
   </userContext.Consumer>
  )
}

export default Contact