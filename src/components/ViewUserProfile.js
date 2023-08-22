import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Row, Table } from 'reactstrap';
import profileImage from '../images/defaultProfile.png'
import { getCurrentUserDetail, isLoggedIn } from '../auth';


const ViewUserProfile = ({user}) => {
const [currentUser, setCurrentUser] = useState(null)
const [login, setLogin] = useState(false)

useEffect(() => {
  setCurrentUser(getCurrentUserDetail())
  setLogin(isLoggedIn())
}, [])





  return (
    <Card>
          <CardBody>
            <h2 className='text-uppercase text-center'>User Information</h2>
            <Container className='text-center'>
             <img src={user.image ? user.image : profileImage}  
             style={{maxWidth:'200px', maxHeight:'200px'}}
             alt='Profile Picture' className='img-fluids3 '/> 
            </Container>
            <Table responsive striped hover className='mt-5'>
            <tbody>
              <tr>
                <td>UserId</td>
                <td>GADA{user.id}</td>
              </tr>
              <tr>
                <td>Username</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>Email </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>About </td>
                <td>{user.about}</td>
              </tr>
              <tr>
                <td>Role </td>
                <td>{user.roles.map((role)=>{
                  return(
                    <div key={role}>{role.name}</div>
                  )
                })}</td>
              </tr>
            </tbody>
            </Table>
            {
                
                currentUser ? ( currentUser.id === user.id  ) ? (
                    <CardFooter className='text-center'>
                    <Button color="warning" >Update Profile</Button>
                </CardFooter>
                ) :'' : ''
            }
          </CardBody>
        </Card>      
  )
}

export default ViewUserProfile