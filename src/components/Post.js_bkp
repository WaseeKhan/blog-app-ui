import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth'
import userContext from '../context/userContext'
import { BASE_URL } from '../services/Helper'

function Post({post={id:-1, title:"This is default post title", content:"This is Post Content"},deletePost}) {


  const userContextData = useContext(userContext)

  const [user, setUser] = useState(null)
  const [login, setLogin] = useState(null)
  useEffect(() =>{
    setUser(getCurrentUserDetail())
    setLogin(isLoggedIn())
  }, [])
  return (
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
        <span><i>Posted By: {post.user.name}</i></span>
                <h2>{post.title}</h2>
                {/* image section */}
                <div className="image-container mt-3 shadow"  style={{maxWidth:'250px', maxHeight:'500px'}}  >
                <Link to={'/posts/'+post.postId}><img src={BASE_URL+'/post/image/' +post.imageName} 
                style={{maxWidth:'250px', maxHeight:'500px'}} 
                alt="PostImage" className="img-fluid" />
                </Link> 
                </div>
                
                {/* html tag issue resolved */}
            <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0,50) + ". . ."}}>
               
            </CardText>
            
            <div>
                {/* <Link className='btn btn-secondary border-1'
                to={'/posts/'+post.postId}>Read More</Link> */}
             {
              userContextData.user.login && (user && user.id===post.user.id ? 
              <Button 
              onClick={()=>deletePost(post)}
                color='danger' className='ms-2'>
                Delete
              </Button> : '')
             }

            {
              userContextData.user.login && (user && user.id===post.user.id ? 
              <Button tag={Link} to={`/user/update-blog/${post.postId}`}
              
                color='warning' className='ms-2'>
                Update
              </Button> : '')
            }

             
            </div>
        </CardBody>
    </Card>
  )
}

export default Post