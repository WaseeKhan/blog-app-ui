import React, { useContext, useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';
import userContext from '../context/userContext';
import profileImage from '../images/defaultProfile.png';
import logo from '../images/logo.png';

import '../App.css';

const CustomNavbar = () => {

  const userContextData  = useContext(userContext)
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [login, setLogin] = useState(false);

    const [user, setUser] = useState(undefined)

    useEffect(()=>{
      setLogin(isLoggedIn())
      setUser(getCurrentUserDetail())
    }, [login]);
    

    const logout = ()=>{
      doLogout(()=>{
        setLogin(false)

        userContextData.setUser({
          data:null,
          login:false
        });
        navigate("/")
      })
    }
  
  return (
    <div>
      <Navbar style={{ backgroundColor: '#610345'}} 
       full expand="md" container="md" >
        <NavbarBrand style={{color:'#FFFFFF', fontWeight:'bold'}} tag={ReactLink} to="/">
         <img src={logo} style={{maxWidth:'100px', maxHeight:'50px'}} /> Artikance
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          <Nav className="me-auto" navbar>
          <NavItem>
              <NavLink  style={{color:'#FFFFFF', fontFamily:'verdana' }} tag={ReactLink} to="/">HOME</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color:'#FFFFFF' , fontFamily:'verdana' }} tag={ReactLink} to="/about">ABOUT</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color:'#FFFFFF', fontFamily:'verdana' }} tag={ReactLink} to="/typing-app">TYPING APP</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color:'#FFFFFF' , fontFamily:'verdana' }} tag={ReactLink} to="/services">SERVICES</NavLink>
            </NavItem>
            
            
            
          </Nav>
          <Nav navbar>
            {
              login && (
                <>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav >
                  <NavItem>
                      {/* tag={ReactLink} to={`/user/profile/${user.id}`} */}
                      
                      <img src={user.image ? user.image : profileImage}
                      className="rounded-circle border hover shadow" alt="DP"
                      style={{maxWidth:'50px', maxHeight:'50px',  height: 'auto'}} />
                      
                </NavItem>
              </DropdownToggle>
              <DropdownMenu right>

              <DropdownItem>Hi! {user.name}</DropdownItem>

              <DropdownItem tag={ReactLink} to="/user/dashboard" >
                    Dashboard
                </DropdownItem>
                
                <DropdownItem tag={ReactLink} to={`/user/profile/${user.id}`}>
                    Profile
                </DropdownItem>

                

                <DropdownItem tag={ReactLink} to="/user/add-post" >
                    Create Post
                </DropdownItem>

                <DropdownItem onClick={logout} href=''>
                    Logout
                </DropdownItem>
                
                
                <DropdownItem divider />
                <DropdownItem>More</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

                
               
                
                </>
              )
            }

            {
              !login && (
                <>
                  <NavItem>
                    <NavLink style={{color:'#FFFFFF'}} tag={ReactLink} to="/login">
                      Login
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink style={{color:'#FFFFFF'}} tag={ReactLink} to="/signup">
                      Signup
                    </NavLink>
                  </NavItem>
                </>
              )
            }
        
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>
  )
}

export default CustomNavbar