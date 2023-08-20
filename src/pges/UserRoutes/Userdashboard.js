import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import AddPost from '../../components/AddPost'
import { Container } from 'reactstrap'
import { getCurrentUserDetail } from '../../auth'
import { deletePostService, loadPostUserWise} from '../../services/PostService'
import { toast } from 'react-toastify'
import Post from '../../components/Post'

const Userdashboard = () => {

  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail())
    loadPostData()

  }, []);

function loadPostData(){
    loadPostUserWise(getCurrentUserDetail().id)
    .then(data=>{
      console.log("Loading Data")
      console.log(data)
      setPosts([...data])
    }).catch(error=>{
      console.log(error)
      toast.success("Error in loading posts")
    })
}

  //function to delete post

  function deletePost(post){
    deletePostService(post.postId).then(res=>{
      console.log(res)
      toast.success("Post deleted")
        // reload post after deleted
      // let newPost =  posts.filter(pst=>pst.postId!== post.postId)
      //  setPosts({...newPost})
       loadPostData()

    }).catch(error=>{
      console.log(error)
      toast.error("Error in deleting post")
    })
  }
  
  return (
    <Base>
    <Container>

    <AddPost />
    <h2 className='my-3'>My Posts Count: {posts.length}</h2>
    { posts && posts.map && posts.map((post, index)=>{
        return(
          <Post post={post} key={index} deletePost = {deletePost} />
        )
      })
    }
    </Container>
      
    </Base>
  )
}

export default Userdashboard