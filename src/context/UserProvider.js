import React, { useEffect, useState } from 'react'
import userContext from './userContext'

function UserProvider({children}) {

    const [user, setUser] = useState({
        name:'Waseem'
    })

    useEffect(()=>{
        setUser({
            name:'Ayaan'
        })
    }, [])
  return (
    <userContext.Provider value={user}>
        {children}
    </userContext.Provider>
  )
}

export default UserProvider