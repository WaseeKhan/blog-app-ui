import React, { useContext, useState } from 'react'
import Base from '../components/Base'

import { Form, Button, Card, CardBody, CardHeader, FormGroup, Input, Label, Row, Col, Spinner } from 'reactstrap'
import { toast } from 'react-toastify'
import { loginUser } from '../services/UserService'
import { doLogin } from '../auth'
import { useNavigate } from 'react-router-dom'
import userContext from '../context/userContext'

function Login() {
const userContextData = useContext(userContext);

  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: '',
    password: ''
  })

  const handleChange = (event, field)=>{
    let actualValue =  event.target.value
    setLoginDetail({...loginDetail,[field]:actualValue
    })
  }
  const resetData=()=>{
    setLoginDetail({
      email: '',
      password: '',
    })
    
  }


const handleFormSubmit = (e) =>{
  e.preventDefault();
  console.log(loginDetail);

  if(loginDetail.username.trim()==='' || loginDetail.password.trim() ===''){
    toast.error("Email and Password Required!")
    return;
  }
  //submit data and geberate tocken
  loginUser(loginDetail)
  .then((data) => {
    // console.log("User LoggedIn : ")
    console.log(data)
    //save data to localstorage
    doLogin(data, ()=>{
      console.log("Login details is saved to local Storage")
      //redirect to dashboard
        userContextData.setUser({
          data:data,
          login:true,

        });
      navigate("/user/dashboard")

      
    })

    
    toast.success("Login Success")
  }).catch(error =>{
    console.log(error)
    if(error.response.status===400 || error.response.status===404){
      toast.error(error.response.data.message)
    }else{
    toast.error("Something went wrong on server!")
  }
  })
};










  return (
    <Base>
    
      
    <div className="container">
    <Row className='mt-5'>
      <Col sm={{size:6, offset:3}}>
      <Card color='dark'outline>
      <CardHeader>
        <h1 className='text-center'>Please Login Here</h1>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleFormSubmit}>
            
          <FormGroup>
            <Label for="email">
              Email
            </Label>
            <Input
            value={loginDetail.username}
            onChange={(e)=>handleChange(e, 'username')}
              id="email"
              name="email"
              placeholder="Enter Email"
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">
              Password
            </Label>
            <Input
            value={loginDetail.password}
            onChange={(e)=>handleChange(e, 'password')}
              id="password"
              name="password"
              placeholder="Enter password "
              type="password"
            />
          </FormGroup>
       
          <Button 
          
          color='success'>
            
            Login
          </Button>
          <Button
          onClick={resetData}
          className='ms-4' type='reset' color='danger'>
            Reset
          </Button>
        </Form>
      </CardBody>
     </Card>
      </Col>

    </Row>
    </div>

    
    </Base>
  )
}

export default Login