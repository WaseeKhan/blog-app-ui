import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Form, Button, Card, CardBody, CardHeader, FormGroup, Input, Label, Row, Col, FormFeedback } from 'reactstrap'
import { signup } from '../services/UserService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Signup() {

  useEffect(()=>{
    document.title = "Artikance : Register "
  })




 const navigate = useNavigate();

  const [data, setData] = useState({

    name: '',
    email: '',
    password: '',
    about: ''
    
    
  });

  useEffect(()=>{
    // console.log(data);
    }, [data]);


  const [error, setError] = useState({
    errors:{},
    isError:false
  })

  const handleChange=(event, property) =>{
    // console.log("Name changed");
    // console.log(event.target.value)
    //Dynamiacally setting value of name, email ,pass etc
    setData({...data, [property]:event.target.value})
    
  }

const resetData=()=>{
  setData({
    name: '',
    email: '',
    password: '',
    about: ''
  })
  
}


const submitForm=(event)=>{
  event.preventDefault()

  // if(error.isError){
  //   toast.error("Please Enter Correct Details");
  //   setError({...error, isError:false})
  //   return;
  // }

  console.log(data)

  signup(data).then((res) =>{
    console.log(res);
    console.log("Success Log");
    toast.success("User Registred Successfully with email: " +res.email)
    setData({
      name: '',
      email: '',
      password: '',
      about: ''
    })

    navigate('/login')
  }).catch((error)=>{
    console.log(error)
    console.log("Error Log")
    setError({
      errors:error,
      isError:true
    })
  })
};
  return (
    
    <Base>
    
    <div className="container">
    {/* { JSON.stringify(data)} */}
    <Row className='mt-5'>

      

      <Col sm={{size:6, offset:3}}>
      <Card color='dark'outline>
      <CardHeader>
        <h1 className='text-center'>Please Register Here</h1>
      </CardHeader>
      <CardBody>
        <Form onSubmit={submitForm}>
            <FormGroup>
            <Label for="name">
              Name
            </Label>
            <Input
            onChange={(e)=>handleChange(e,'name')}
            value={data.name}
            invalid= { error.errors?.response?.data?.name ? true: false }
              id="name"
              name="name"
              placeholder="Enter Name"
              type="text"
            />
            <FormFeedback>{ error.errors?.response?.data?.name }</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="email">
              Email
            </Label>
            <Input
            onChange={(e)=>handleChange(e,'email')}
            value={data.email}
            invalid= { error.errors?.response?.data?.email ? true: false }
              id="email"
              name="email"
              placeholder="Enter Email"
              type="email"
            />
            <FormFeedback>{ error.errors?.response?.data?.email }</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="password">
              Password
            </Label>
            <Input
            onChange={(e)=>handleChange(e,'password')}
            value={data.password}
            invalid= { error.errors?.response?.data?.password ? true: false }
              id="password"
              name="password"
              placeholder="Enter password "
              type="password"
            />
            <FormFeedback>{ error.errors?.response?.data?.password }</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="about">
              About
            </Label>
            <Input
              onChange={(e)=>handleChange(e,'about')}
              value={data.about}
              invalid= { error.errors?.response?.data?.about ? true: false }
              id="about"
              name="about"
              placeholder="Tell something about you!"
              type="textarea"
            />
            <FormFeedback>{ error.errors?.response?.data?.about }</FormFeedback>
          </FormGroup>
          <Button color='success'>
            Register
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

export default Signup