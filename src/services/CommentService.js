import { privateAxios } from "./Helper"

export const createComment = (comment, postId)=>{
    return privateAxios.post(`/posts/${postId}/comments`, comment)

}