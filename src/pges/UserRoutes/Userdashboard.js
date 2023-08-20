import React, { useState } from 'react'
import Base from '../../components/Base'
import AddPost from '../../components/AddPost'
import { Container } from 'reactstrap'
import { getCurrentUserDetail } from '../../auth'
const Userdashboard = () => {

  const [user, setUser] = useState({})

  useEffect(() => {
    console.log(getCurrentUserDetail());

    setUser(getCurrentUserDetail())

  }, [])
  
  return (
    <Base>
    <Container>

    <AddPost />
    
    </Container>
      
    </Base>
  )
}

export default Userdashboard