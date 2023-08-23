import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import CategorySideMenu from '../components/CategorySideMenu'
import { deletePostService, loadPostCategoryWise, loadPostCatgegory } from '../services/PostService'
import { toast } from 'react-toastify'
import Post from '../components/Post'


function Categories() {

  useEffect(()=>{
    document.title = "Artikance : Categories Wise Posts"
  })

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



    
  function deletePost(post){
    deletePostService(post.postId).then(res=>{
      console.log(res)
      toast.success("Post deleted")
        // reload post after deleted
        console.log("reloaded data")
      let newPost = posts.filter(pst=>pst.postId!== post.postId)
       setPosts({...newPost})
       

    }).catch(error=>{
      console.log(error)
      toast.error("Error in deleting post")
    })
  }

  return (
    <Base>
    <Container className='mt-3'>


<Row>
  <Col md={3} className='pt-3'>
    <CategorySideMenu />
  </Col>
  <Col md={9}>
   {/* new NewFeed */}
   <h3>
          Category Wise Blogs Count: { posts.length}
          
        </h3>

   {
    posts && posts.map && posts.map((posts, index)=>{
        return(
            <Post post={posts} key={index} deletePost={deletePost}/>
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