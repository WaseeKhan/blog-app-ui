import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle } from 'reactstrap'
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

<>
    {/* experiment */}

    
    <a href={'/posts/'+post.postId}> <div>
    
  <Card inverse>
  
    <CardImg
      alt="Card image cap"
      
      src={BASE_URL+'/post/image/' +post.imageName} 
      
      style={{
        height: 300
      }}
      width="100%"
    />
    
    <CardImgOverlay>
      <CardTitle tag="h5">
      {post.title}
      </CardTitle>
      <CardText>
      <span><i>By : { post.user.name}</i></span>
        
         
        
      </CardText>
      <CardText 
      dangerouslySetInnerHTML={{ __html: post.content.substring(0,300) + ". . ." 
      
      }}>
      </CardText>
      <p style={{background:"#610345", width:"100px", padding: "3px" , borderRadius:"5px", textAlign:"center"}}>
        {post.category.categoryTitle}
        </p>
      <CardText>
      



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


      </CardText>
      
    </CardImgOverlay>
    
  </Card>
</div>

</a>
<div>&nbsp;</div>
    {/* experiment end */}


    </>
  )
}

export default Post