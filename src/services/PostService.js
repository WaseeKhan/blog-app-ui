
import { myAxios, privateAxios } from './Helper'


//create post function
export const createPost = (postData) => {
    // console.log(postData);
  return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,
   postData
   )
  .then((response) =>response.data);
}

//get all posts
export const loadAllPosts=(pageNo, pageSize)=>{
  return myAxios.get(`/posts?pageNo=${pageNo}&pageSize=${pageSize}`)
  .then(response=>response.data)
}

export const loadPostById = (postId)=>{
  return myAxios.get("/posts/" +postId).then(response=>response.data);
}

// upload Image

export const uploadPostImage =(image, postId)=>{
  let formData = new FormData()
  formData.append("image", image)

  return privateAxios.post(`/post/image/upload/${postId}`, formData,{
    headers:{
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((response)=>(response.data))
}