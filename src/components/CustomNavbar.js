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
      <Navbar
      color='dark' dark expand="md" fixed='' className='px-5'>
        <NavbarBrand tag={ReactLink} to="/">Gada Blog</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          
          <NavItem>
              <NavLink tag={ReactLink} to="/">New Feed</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/typing-app">Typing App</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">Service</NavLink>
            </NavItem>
            
            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Services</DropdownItem>
                <DropdownItem>Contact</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>More</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {
              login && (
                <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/profile">
                    Profile
                  </NavLink>
                </NavItem>
                
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    Hello! {user.name}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout} href=''>
                    Logout
                  </NavLink>
                </NavItem>
                </>
              )
            }

            {
              !login && (
                <>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/login">
                      Login
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink tag={ReactLink} to="/signup">
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