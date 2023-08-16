//isLoggedIn if tocken details are vaibale in local storage means user login
export const isLoggedIn =() =>{
    let data = localStorage.getItem("data")
    if(data===null){
        return false;
    }else{
        return true;
    }
};

//doLogin set tocken in local storage
export const doLogin=(data, next) =>{
    localStorage.setItem("data", JSON.stringify(data))
    next()
}


//doLogout remove from local storage

export const doLogout = (next)=>{
    localStorage.removeItem("data")
    next()
}

//getCurrent User

export const getCurrentUserDetail=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).user;
    }else{
        return undefined;
    }
};
export const getToken = ()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).token
    }else{
        return null;
    }
}

