import React, { useEffect, useState } from 'react'
import Base from './Base'
import { Table } from 'reactstrap'
import { getAllUserService } from '../services/UserService';

const AllUsers = () => {

    const [user, setUser] = useState([]);
    useEffect((user)=>{
        setUser(user)
    }, [])

    const getAllUsers=(user)=>{
        getAllUserService(user).then(data=>{
            console.log(data)
            setUser(data)
        }).catch(error=>{
            console.log(error)
        })
    }

  return (
   <Base>
        <Table>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    
  </tbody>
</Table>
    
   
   </Base>
  )
}

export default AllUsers