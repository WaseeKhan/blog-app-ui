import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Table } from 'reactstrap';
import profileImage from '../images/defaultProfile.png'
import { getCurrentUserDetail, isLoggedIn } from '../auth';
import { Link } from 'react-router-dom';
import Base from '../components/Base';



const UpdateProfile = ({user}) => {



  const [currentUser, setCurrentUser] = useState(null)
  const [login, setLogin] = useState(false)

  





  return (

    <Base>
      <h1>update: </h1>
    </Base>
           
         
  )
}

export default UpdateProfile