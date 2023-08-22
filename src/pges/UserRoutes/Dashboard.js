import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import AddPost from '../../components/AddPost'
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import { getCurrentUserDetail } from '../../auth'
import { deletePostService, loadAllPosts, loadPostUserWise} from '../../services/PostService'
import { toast } from 'react-toastify'
import Post from '../../components/Post'
import { Link } from 'react-router-dom'

const Dashboard = () => {

    const [postContent, setPostContent] =  useState({
        content:[],
        totalPages: '',
        totalElements: '',
        pageSize:'',
        lastPage:false,
        pageNo:''
      })
  
      const [currentPage, setCurrentPage] = useState(0)
  
      useEffect(()=>{
        // //load all posts from server
        // loadAllPosts(0, 5).then((data)=>{
        //   console.log(data);
        //   setPostContent(data)
        // }).catch(error=>{
        //   console.log(error)
        //   toast.error("Error in loading data")
        // })
  
        changePage(currentPage)
        
      },[currentPage])
  
  
      const changePage = (pageNo=0, pageSize=5)=>{
       if(pageNo > postContent.pageNo && postContent.lastPage){
        return ;
       }
       if(pageNo < postContent.pageNo && postContent.pageNo===0){
        return ;
       }
        loadAllPosts(pageNo, pageSize)
        .then(data=>{
          // setPostContent(data)
          setPostContent({
            content: [...postContent.content,...data.content],
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize:data.pageSize,
            lastPage: data.lastPage,
            pageNo: data.pageNo
          })
  
          console.log(data);
          window.scroll(0,0)
        }).catch(error=>{
          toast.error("Error in loading data")
        })
      }
      const changePageInfinite = () =>{
        console.log("Page Changed")
        setCurrentPage(currentPage+1)
      }
  
      function deletePost(post){
        deletePostService(post.postId).then(res=>{
          console.log(res)
          toast.success("Post deleted")
         let newPostContenets =  postContent.content.filter(pst=>pst.postId!= post.postId)
         setPostContent({...postContent, content:newPostContenets})
        }).catch(error=>{
          console.log(error)
          toast.error("Error in deleting post")
        })
      }
  
  return (
    <Base>
        <Container className='mt-3'>
            <Card>
                <CardHeader>
                    <h1>Post Analysis</h1>
                </CardHeader>
                <CardBody>
            
 
        <Row>
            <Col className="bg-light border">
            
            <Link to="/user/your-posts/"><h4>See Your Posts</h4></Link>
            </Col>
            <Col className="bg-light border">
            <Link to="/"><h4>See All Posts</h4></Link>
            </Col>

            <Col className="bg-light border">
            <h3>Post Count</h3>
            <h3>{ postContent?.totalElements }</h3>
        
            </Col>

            <Col className="bg-light border">
            <h3>Page Size</h3>
            <h3>{ postContent?.pageSize }</h3>
            </Col>
        </Row>


   
        <Row>
            <Col className="bg-light border">
            <h3>Total Pages</h3>
            <h3>{ postContent?.totalPages }</h3>

            </Col>
            <Col className="bg-light border">
            <h3>Post Count</h3>
            <h3>{ postContent?.totalElements }</h3>
            </Col>

            <Col className="bg-light border">
            comming
          
            </Col>

            <Col className="bg-light border">
            <h3>Page Size</h3>
            <h3>{ postContent?.pageSize }</h3>
            </Col>
        </Row>
        </CardBody>
        </Card>
 </Container>



 {/* User Analysis */}

 <Container className='mt-3'>
            <Card>
                <CardHeader>
                    <h1>User Analysis</h1>
                </CardHeader>
                <CardBody>
            
 
        <Row>
            <Col className="bg-light border">
            
            <Link to="/user/your-posts/"><h4>See Your Posts</h4></Link>
            </Col>
            <Col className="bg-light border">
            <Link to="/"><h4>See All Posts</h4></Link>
            </Col>

            <Col className="bg-light border">
            <h3>Post Count</h3>
            <h3>{ postContent?.totalElements }</h3>
        
            </Col>

            <Col className="bg-light border">
            <h3>Page Size</h3>
            <h3>{ postContent?.pageSize }</h3>
            </Col>
        </Row>


   
        <Row>
            <Col className="bg-light border">
            <h3>Total Pages</h3>
            <h3>{ postContent?.totalPages }</h3>

            </Col>
            <Col className="bg-light border">
            <h3>Post Count</h3>
            <h3>{ postContent?.totalElements }</h3>
            </Col>

            <Col className="bg-light border">
            comming
          
            </Col>

            <Col className="bg-light border">
            <h3>Page Size</h3>
            <h3>{ postContent?.pageSize }</h3>
            </Col>
        </Row>
        </CardBody>
        </Card>
 </Container>
    </Base>
  )
}

export default Dashboard