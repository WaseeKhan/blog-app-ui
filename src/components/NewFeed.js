import React, { useEffect, useState } from 'react'
import { loadAllPosts } from '../services/PostService'
import { Col, Pagination, PaginationItem, PaginationLink, Row,Container } from 'reactstrap';
import Post from './Post';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

function NewFeed() {

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
        // window.scroll(0,0)
      }).catch(error=>{
        toast.error("Error in loading data")
      })
    }
    const changePageInfinite = () =>{
      console.log("Page Changed")
      setCurrentPage(currentPage+1)
    }

  return (
   <div className="container-fluid">
    <Row>
      <Col md={{size:12}}>

        <h3>
          Blogs Count: { postContent?.totalElements } | 
          pageSize: { postContent?.pageSize } |
          totalPages: { postContent?.totalPages } |
          page no: { postContent?.pageNo +1 } 
        </h3>

        <InfiniteScroll 
        dataLength={postContent.content.length}
        next={changePageInfinite}
        hasMore={!postContent.lastPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        >

        {
          postContent.content.map((post)=>(
            <Post post={post} key={post.postId} />
          ))
        }
      </InfiniteScroll>
    
        {/* pagination start here  */}

{/* <Container className='mt-3'>
<Pagination>
  <PaginationItem>
    <PaginationLink
      first
      href="#"
    />
  </PaginationItem>
  <PaginationItem onClick={()=>changePage( postContent.pageNo -1)} disabled ={postContent.pageNo===0}  >
    <PaginationLink
      href="#"
      previous
    />
  </PaginationItem>
  {
    [...Array(postContent.totalPages)].map((item, index)=>(

  

  <PaginationItem onClick={()=>changePage(index)} active={index===postContent.pageNo} key={index}>
    <PaginationLink href="#">
      {index+1}
    </PaginationLink>
  </PaginationItem>
    ))
  }
  
  <PaginationItem onClick={()=>changePage(postContent.pageNo +1)} disabled={postContent.lastPage}>
    <PaginationLink
      href="#"
      next
    />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      href="#"
      last
    />
  </PaginationItem>
</Pagination>
</Container> */}

{/* pagination end here  */}

  </Col>
      
    </Row>
   </div>
  )
}

export default NewFeed