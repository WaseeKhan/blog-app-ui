import React, { useEffect, useState } from 'react'
import { loadAllCategories } from '../services/CategoryService'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { getCurrentUserDetail, isLoggedIn } from '../auth'
import userContext from '../context/userContext'



function TraindingPost(
    {post={id:-1, title:"This is default post title", content:"This is Post Content"}}
){


    const userContextData = useContext(userContext)

    const [user, setUser] = useState(null)
    const [login, setLogin] = useState(null)
    useEffect(() =>{
      setUser(getCurrentUserDetail())
      setLogin(isLoggedIn())
    }, [])
  
  return (
    
<div>
      <ListGroup>
        <ListGroupItem tag={Link} to="/" action={true} className=''>
          <b>Tranding Posts</b>
        </ListGroupItem>
        
              <ListGroupItem>
              {post.title}
              </ListGroupItem>
            )
          })
        }
      </ListGroup>
    </div>


  );
}

export default TraindingPost