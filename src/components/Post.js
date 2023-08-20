import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardText } from 'reactstrap'

function Post({post={ title:"This is default post title", content:"This is Post Content" }}) {
  return (
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
                <h2>{post.title}</h2>
                {/* html tag issue resolved */}
            <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0,50) + ". . ."}}>
               
            </CardText>
            
            <div>
                <Link className='btn btn-secondary border-1'
                to={'/posts/'+post.postId}>Read More</Link>
            </div>
        </CardBody>
    </Card>
  )
}

export default Post