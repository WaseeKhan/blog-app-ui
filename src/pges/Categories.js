import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import CategorySideMenu from '../components/CategorySideMenu'
import { loadPostCategoryWise, loadPostCatgegory } from '../services/PostService'
import { toast } from 'react-toastify'
import Post from '../components/Post'

function Categories() {
    const [posts, setPosts] = useState([])

    const {categoryId} = useParams()

    useEffect(()=>{
        console.log(categoryId)
        loadPostCategoryWise(categoryId).then(data=>{
            setPosts([...data])
        }).catch(error=>{
            console.log(error)
            toast.error("Error in loading category")
        })
    }, [categoryId])
  return (
    <Base>
    <Container className='mt-3'>


<Row>
  <Col md={2} className='pt-3'>
    <CategorySideMenu />
  </Col>
  <Col md={10}>
   {/* new NewFeed */}
   <h3>
          Category Wise Blogs Count: { posts.length}
          
        </h3>

   {
    posts && posts.map((posts, index)=>{
        return(
            <Post post={posts} key={index}/>
        )
    })
     
   }
   { posts.length <=0 ? <h2>No Post in this category</h2> :'' }

  </Col>
</Row>
</Container>

    </Base>
  )
}

export default Categories