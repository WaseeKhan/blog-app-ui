import { useEffect, useRef, useState } from 'react'
import { Button, Card,CardHeader, CardBody, Form, FormGroup, Input, Label, Container } from 'reactstrap'
import { loadAllCategories } from '../services/CategoryService'
import JoditEditor from 'jodit-react';
import { createPost as doCreatePost, uploadPostImage } from '../services/PostService';
import { getCurrentUserDetail } from '../auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Base from './Base';



const AddPost = () => {
    useEffect(()=>{
        document.title = "Artikance : Add Post "
      })
    

    const editor = useRef(null);
    // const [content, setContent] = useState('');
    // const config = {
    //     placeholder:'Write Something Amazing . . . '
    // }
    const [categories, setCategories] = useState([])

    const [user, setUser] = useState(undefined)

    const [post, setPost] = useState({
        title:'',
        content: '',
        categoryId:''
    })

    const [image, setImage] = useState(null)

    const navigate = useNavigate();

    
    useEffect(
        ()=>{
        
            setUser(getCurrentUserDetail())
            loadAllCategories().then((data)=>{
                console.log(data)
                setCategories(data)
            }).catch(error=>{
                console.log(error)
            })
        },[])


        const fieldChanged=(event)=>{
            console.log(event.target.content)
            setPost({...post, [event.target.name]: event.target.value})
        }

        const contentFieldChanged = (data)=>{
            setPost({...post, 'content':data})

        }
        const resetPost=()=>{
            setPost({
              title: '',
              content: '',
              categoryId: ''
            })
            
          }
//create post

const createPost = (event)=>{
    event.preventDefault();
    console.log("Form SUbmitted")
    console.log(post)

    if(post.title.trim()===''){
        toast.error("Post Title Required!!")
        return;
    }

    if(post.content.trim()===''){
        toast.error("Post Content Required!")
        return;
    }

    if(post.categoryId.trim()===''){
        toast.error("select Some Category")
        return;
    }
   //submit the form once serve
   post['userId'] = user.id
   doCreatePost(post).then(data=>{
        // alert("Post Created!!")

        uploadPostImage(image, data.postId)
        .then(data=>{
            toast.success("Image Uploaded!!")
        }).catch(error=>{
            toast.error("Error in uploading Image")
            console.log(error)
        })


        toast.success("Congratulations! Post Created!")
    setPost({
        title:'',
        content: '',
        categoryId:''
    })
        navigate('/')
        console.log(post)
    }).catch((error)=>{
        // alert("error")
        toast.error("We're Sorry, Something Went")
        console.log(error)
    })
}

const handleFileChange = (event) =>{
    console.log(event.target.files[0])
    setImage(event.target.files[0])
}


  return (
    <Base>
    <Container>
      <Card className='shadow-lg mt-3'>
        
        <CardHeader>
        <h1 className='text-center'>Please Post Here</h1>
      </CardHeader>
      <CardBody>
        {/* {JSON.stringify(post)} */}
    <Form onSubmit={createPost}>
    <FormGroup>
        <Label for="title">
        Title
        </Label>
        <Input
        id="title"
        name="title"
        placeholder="Title"
        type="text"
        onChange={fieldChanged}
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
        onChange={contentFieldChanged}
        />
    </FormGroup>

    {/* Image upoad start*/}

        <div className="mt-3">
        <label for="image">Upload Image</label>
        <Input type='file' id="image"  
        onChange={handleFileChange}
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
        onChange={fieldChanged}
        defaultValue={0}
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
        Create Post
    </Button>

    <Button type='reset'
    onChange={resetPost}
    color='danger' className='ms-2 rounded-0'>
        Reset Content
    </Button>
    </Container>
    </Form>
    {/* {content} */}
    </CardBody>
  
      </Card>

      </Container>
      </Base>
  )
}


export default AddPost