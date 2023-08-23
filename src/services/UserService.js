
import { myAxios, privateAxios } from './Helper'

export const signup = (user) => {
  return myAxios
  .post("/auth/register", user)
  .then((response)=> response.data)
};


export const loginUser = (loginDetail) => {
  return myAxios
  .post("/auth/login", loginDetail)
  .then((response)=> response.data)
};

export const getUserById=(userId)=>{
  return privateAxios.get(`/users/${userId}`).then(res=>res.data)
}

export const getAllUserService=()=>{
  return privateAxios.get(`/users`)
  .then(response=>response.data)
}