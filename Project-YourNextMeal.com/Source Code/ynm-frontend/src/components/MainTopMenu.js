import React, { Component,useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Context } from './Context';
import Logo from '../images/yournextmealcom-low-res.png';


function MainTopMenu() {


  const { isLoggedIn, setIsLoggedIn } = useContext(Context);
  const { userInfo, setUserInfo } = useContext(Context);
  console.log ("MainTopMenu.js: isLoggedIn: ",isLoggedIn);
  console.log ("MainTopMenu.js: userInfo: ",userInfo);
  let isUserLoggedIn = localStorage.getItem('isLoggedIn');
  let email = localStorage.getItem('Email');
  let kind = localStorage.getItem('Kind');
  console.log ("MainTopMenu.js: isUserLoggedIn: ",isUserLoggedIn);
  console.log ("MainTopMenu.js: email: ",email);
  console.log ("MainTopMenu.js: kind: ",kind);
  if (!isUserLoggedIn) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/home"><img width="150px" height="auto" className="img-responsive" src={Logo}  alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About Us</Nav.Link>
           
            <NavDropdown title="Features" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/donors">Donors</NavDropdown.Item>
              <NavDropdown.Item href="/recipients">
                Recipients
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/contactus">Contact Us</Nav.Link>
          </Nav>
          
          <Nav>
            <Nav.Link href="/authsignup">Sign Up</Nav.Link>
            <Nav.Link href="/login">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  } else {
    return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/home" ><img width="150px" height="auto" align="left" className="img-responsive" src={Logo}  alt="logo" /> </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default MainTopMenu;