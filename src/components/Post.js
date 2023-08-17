import React from 'react'
import { Button, Card, CardBody, CardText } from 'reactstrap'

function Post({post={ title:"This is default post title", content:"This is Post Content" }}) {
  return (
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
                <h2>{post.title}</h2>
            <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,10) + ". . ."}}>
                
            </CardText>

            <div>
                <Button>Read More</Button>
            </div>
        </CardBody>
    </Card>
  )
}

export default Post