import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/CategoryService'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const CategorySideMenu = () => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadAllCategories().then(data=>{
      console.log("loading categories")
      console.log(data)
      setCategories([...data])
    }).catch(error=>{
      console.log(error)
      toast.error("Error in loading categories")
    })
  
  }, [])
  
  return (
    <div>
      <ListGroup>
        <ListGroupItem tag={Link} to="/" action={true} className=''>
          <b>All Blogs</b>
        </ListGroupItem>
        {
          categories && categories.map((cat, index)=>{
            return(
              <ListGroupItem action={true} tag={Link} to={'/categories/'+cat.categoryId}  className='shadow' key={index}>
              {cat.categoryTitle}
              </ListGroupItem>
            )
          })
        }
      </ListGroup>
    </div>
  )
}

export default CategorySideMenu