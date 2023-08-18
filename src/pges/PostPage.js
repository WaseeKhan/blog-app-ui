import { Link, useParams } from "react-router-dom"
import Base from "../components/Base"
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap"
import { useEffect, useState } from "react"
import { loadPostById } from "../services/PostService"
import { toast } from "react-toastify"
import { BASE_URL } from "../services/Helper"
import { createComment } from "../services/CommentService"
import { isLoggedIn } from "../auth"
const PostPage=()=>{

    const {postId} = useParams()
    const [post, setPost] = useState()
    const[comment, setComment] = useState({
        content: ''
    })

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

    const submitComment=()=>{

        if(!isLoggedIn()){
            toast.error("Hey, Please Login")
            return
        }
        if(comment.content.trim()===''){
            return 
            
        }
        createComment(comment, post.postId)
        .then(data=>{
            console.log(data)
            toast.success("Commented Added!")
           setPost({
            ...post, 
            comments:[...post.comments,data.data]
           })
           setComment({
            content:''
           })
        }).catch(error=>{
            console.log(error)
        })
    }
    return(
       <Base>

        <Container className="mt-4">
        You're here: <Link to="/">Home</Link>/{post && (<Link to="">{post.title}</Link>)}
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
            <Row className="my-4">
                <Col md={
                    {
                        size:9,
                        offset:1
                    }
                }>
                <h3>Comments ( {post ? post.comments.length : 0 } )</h3>
                {
                    post && post.comments.map(c=>(
                        <Card className="mt-3 border-0" key={post.id}>
                            <CardBody>
                                <CardText>
                                {c.content}
                                </CardText>
                            </CardBody>
                        </Card>
                    ))
                }

                        <Card className="mt-3 border-0">
                            <CardBody>
                                <Input 
                            
                                onChange={(event)=>setComment({content: event.target.value})}
                                value={comment.content}
                                type="textarea" placeholder="Enter Comment Here">
                                </Input>
                                <Button 
                                onClick={submitComment}
                                className="mt-3" color="primary">Comment</Button>
                            </CardBody>
                        </Card>
                </Col>
            </Row>
        </Container>
       </Base>
    )
}

export default PostPage