import React, { useContext } from 'react'
import Base from '../../components/Base'
import userContext from '../../context/userContext'
import { useEffect, useState } from 'react';
import { getUserById } from '../../services/UserService'; 
import { useParams } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
import profileImage from '../../images/defaultProfile.png'
import ViewUserProfile from '../../components/ViewUserProfile';

const ProfileInfo = () => {
  useEffect(()=>{
    document.title = "Artikance : Profile "
  })

// const object = useContext(userContext)
const {userId} = useParams()
const [user, setUser] = useState(null)

useEffect(()=>{
  getUserById(userId).then(data=>{
    console.log(data)
    setUser({...data})
  })
}, [])


const userView = ()=>{
  return(
    <Row>
      <Col md={{size:6, offset:3}}>
       <ViewUserProfile user={user}/>
      </Col>
    </Row>
  )
}




  return (

    <Base>
    {user ? userView() :'Loading User data'}
    </Base>
  )
}

export default ProfileInfo