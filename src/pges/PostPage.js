import { Link, useParams } from "react-router-dom"
import Base from "../components/Base"
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap"
import { useEffect, useState } from "react"
import { loadPostById } from "../services/PostService"
import { toast } from "react-toastify"
import { BASE_URL } from "../services/Helper"
const PostPage=()=>{

    const {postId} = useParams()
    const [post, setPost] = useState()

    useEffect(()=>{
        //load post of post id
        loadPostById(postId).then(data=>{
            console.log(data)
            setPost(data)
        }).catch(error=>{
            console.log(error)
            toast.error("Error in Loading Posts")
        })
    }, [])

    const printDate=(numbers)=>{
        return new Date(numbers).toLocaleString()
    }
    return(
       <Base>

        <Container className="mt-4">
        <Link to="/">Home</Link>
            <Row>
                <Col md = {{
                    size:12
                }}>
                    <Card className="mt-3"> 
                        
                            {
                                (post) && (
                                <CardBody>
                                    <CardText>Posted By: <b>{post.user.name}</b> on <b>{ printDate(post.addedDate) }</b></CardText>
                                    <CardText>
                                        <span className="text-muted">Post Category: {post.category.categoryTitle}</span>
                                    </CardText>
                                    <CardText className="mt-3">
                                        <h3>{post.title}</h3>
                                    </CardText>
                                    <div className="image-container mt-3 shadow" style={{maxWidth:'50%'}}>
                                        <img src={BASE_URL+'/post/image/' +post.imageName} alt="" className="img-fluid" />
                                    </div>
                                    <CardText className="mt-4" dangerouslySetInnerHTML={{__html:post.content}}>

                                    </CardText>
                                </CardBody>
                                )
                            }
                            
                        
                    </Card>
                </Col>
            </Row>
        </Container>
       </Base>
    )
}

export default PostPage