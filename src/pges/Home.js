import React, { useEffect } from 'react'
import Base from '../components/Base'
import NewFeed from '../components/NewFeed'
import { Col, Container, Row } from 'reactstrap'
import CategorySideMenu from '../components/CategorySideMenu'
import TraindingPost from './TraindingPosts'
import ImageSlide from '../components/ImageSlide'

const Home = () => {

  useEffect(()=>{
    document.title = "Artikance : Home "
  })

  return (
      <Base>
      <Container className='mt-1'>

      <ImageSlide />
      <Row>
        <Col md={4}>
          <CategorySideMenu />
        </Col>
        <Col md={8}>
        
          <NewFeed />
        </Col>
        <Col md={3}>
        {/* <TraindingPost /> */}
        </Col>
      </Row>


{/* right */}

     
     

      </Container>
      
    
      </Base>
    
    
  )
}

export default Home