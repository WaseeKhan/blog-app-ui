import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import AddPost from '../../components/AddPost'
import { Container } from 'reactstrap'
import { getCurrentUserDetail } from '../../auth'
import { loadPostUserWise } from '../../services/PostService'
import { toast } from 'react-toastify'
import Post from '../../components/Post'

const Userdashboard = () => {

  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  useEffect(() => {
    console.log(getCurrentUserDetail());

    setUser(getCurrentUserDetail())

    loadPostUserWise(getCurrentUserDetail().id)
    .then(data=>{
      console.log(data)
      setPosts([...data])
    }).catch(error=>{
      console.log(error)
      toast.success("Error in loading posts")
    })

  }, [])
  
  return (
    <Base>
    <Container>

    <AddPost />
    <h2 className='my-3'>My Posts Count: {posts.length}</h2>
    {
      posts.map((post, index)=>{
        return(
          <Post post={post} key={index}/>
        )
      })
    }
    </Container>
      
    </Base>
  )
}

export default Userdashboard