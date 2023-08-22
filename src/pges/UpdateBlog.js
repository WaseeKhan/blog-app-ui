import React, { useContext, useEffect, useState , useRef} from 'react'
import Base from '../components/Base'
import {  useNavigate, useParams } from 'react-router-dom'
import userContext from '../context/userContext'
import { toast } from 'react-toastify'
import {  loadPost } from '../services/PostService'
import { Button, Card,Form, CardBody, CardHeader, Container, FormGroup, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../services/CategoryService'
import JoditEditor from 'jodit-react'; 


const UpdateBlog = () => {

    const editor = useRef(null);

    const [categories, setCategories] = useState([])

    const { blogId } = useParams()

    const object = useContext(userContext)

    const navigate = useNavigate();

    const  [post, setPost] = useState(null)

    useEffect(()=>{
        loadAllCategories().then((data)=>{
            console.log(data)
            setCategories(data)
        }).catch(error=>{
            console.log(error)
        })



        //load blog from db
        loadPost(blogId).then(data=>{
            setPost({ ...data })
        }).catch(error=>{
            console.log(error)
            toast.error("Error in loading Blog")
        })

    }, [])

useEffect(()=>{
    console.log("First")
    if (post){
        if (post.user.id != object.user.data.id){
            toast.error("This is not your post")
            navigate("/")
        }
    }
}, [post])

const handleChange=(event, fieldName)=>{
    setPost({
    ...post, [fieldName]: event.target.value
})
}

const updateHtml=()=>{
    return(

        <div className="wrapper">
      <Card className='shadow-lg mt-3'>
        
        <CardHeader>
        <h1 className='text-center'>Please Update Post Here</h1>
      </CardHeader>
      <CardBody>
        {JSON.stringify(post)}
<Form onSubmit={''}>
    <FormGroup>
        <Label for="title">
        Title
        </Label>
        <Input
        id="title"
        name="title"
        placeholder="Title"
        type="text"
        value={post.title}
        onChange={(event) => handleChange(event, 'title')}
        />
    </FormGroup>
    <FormGroup>
        <Label for="content">
        Content
        </Label>
        {/* <Input
        id="content"
        name="content"
        placeholder="Enter content"
        type="textarea"
        style={{height:'150px'}}
        /> */}

        <JoditEditor 
        ref={editor}
        value={post.content}
        // config={config}
        // onChange={newContent=>setContent(newContent)}
        onChange={''}
        />
    </FormGroup>

    {/* Image upoad start*/}

        <div className="mt-3">
        <label for="image">Upload Image</label>
        <Input type='file' id="image"  
        onChange={''}
        >

        </Input>
        </div>
    {/* image upload end */}

    <div className="mt-3">
    <FormGroup>
        <Label for="category">
        Category
        </Label>
        <Input
        id="category"
        name="categoryId"
        type="select"
        onChange={''}
        defaultValue={0}
        value={post.category.categoryId}
        >

            <option disabled value={0}> Select Category </option>
            {
                categories.map((category)=>(
                <option value ={category.categoryId} key={category.id}>
                    {category.categoryTitle}
                </option>
                ))
            }
        
       
       
        </Input>
    </FormGroup>
    </div>
    <Container className='text-center'>
    <Button type='submit' className=' rounded-0' color='primary'>
        Update Post
    </Button>

    <Button type='reset'
    onChange={''}
    color='danger' className='ms-2 rounded-0'>
        Reset Content
    </Button>
    </Container>
    </Form>
    {/* {content} */}
    </CardBody>
  
      </Card>

    </div>
    )
}


  return (
    <Base>
    <Container>{post && updateHtml()}</Container>
    
    
    </Base>
  )
}

export default UpdateBlog