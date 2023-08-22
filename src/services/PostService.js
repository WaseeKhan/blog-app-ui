
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

export const loadPostCategoryWise =(categoryId)=>{
  return myAxios.get(`/category/${categoryId}/posts`)
  .then(res=>res.data)

}

export const loadPostUserWise =(userId)=>{
  return privateAxios.get(`/user/${userId}/posts`)
  .then(res=>res.data)
}

export function deletePostService(postId){
  return privateAxios.delete(`/posts/${postId}`).then(res=>res.data)

}
// load single post given Id

export const loadPost = (postId) =>{
  return myAxios.get(`posts/` +postId).then((response)=>response.data);
}

export function updatePostService(post, postId){
  console.log(post)
  return privateAxios.put(`/posts/${postId}`, post).then((res)=> res.data)
}