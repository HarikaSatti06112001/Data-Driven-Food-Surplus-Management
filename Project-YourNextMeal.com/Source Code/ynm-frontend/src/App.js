import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import React, { Component,useContext,useState }  from 'react';
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainTopMenu from "./components/MainTopMenu";
import Sidebar from "./components/sidebar";

import AuthSignup from "./components/Signup";
import Login from "./components/Login";
import MyProfile from "./pages/myprofile";
import Createdonation from "./pages/createdonation";
import { Context, ContextProvider } from "./components/Context";
import LoginTopMenu from "./components/LoginTopMenu";
import Listdonation from "./pages/listdonations";
import Editdonation from "./pages/editdonation";
import Deletedonation from "./pages/deletedonation";
import Logout from "./components/Logout";
import Listdonations from "./pages/listdonations";
import Activedonations from "./pages/activedonations";
import Myacceptdonations from "./pages/myacceptdonations";
import Dropofflocations from "./pages/dropofflocations";
import Contactus from "./pages/contactus";
import Donors from "./pages/donors";
import Recipients from "./pages/recipients";
import Home from './pages/home';
import About from './pages/about';
import axios from 'axios';


function App() {

    //const { isLoggedIn, userInfo } = useContext(Context);
    const { isLoggedIn, setIsLoggedIn } = useContext(Context);
    const { userInfo, setUserInfo } = useContext(Context);
    let isUserLoggedIn = localStorage.getItem('isLoggedIn');
    let email = localStorage.getItem('Email');
    let kind = localStorage.getItem('Kind');
    console.log ("App.js: isLoggedIn: ",isLoggedIn);
    console.log ("App.js: userInfo: ",userInfo);

    //if (isLoggedIn === false) { 
      return (
        <BrowserRouter>
          <Container fluid> 
          <Row>
          <Col >
            <MainTopMenu /> 
          </Col>
        </Row>
        <Row>
          { isUserLoggedIn ? <Col xs={4} md={2}><Sidebar /></Col> : null }
 
          <Col>
          <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/authsignup" element={<AuthSignup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/createdonation" element={<Createdonation />} />
              <Route path="/MyProfile" element={<MyProfile />} />
              <Route path="/listdonations" element={<Listdonations />} />
              <Route path="/editdonation" element={<Editdonation />} />
              <Route path="/deletedonation" element={<Deletedonation />} />
              <Route path="/activedonations" element={<Activedonations />} />
              <Route path="/myacceptdonations" element={<Myacceptdonations />} />
              <Route path="/dropofflocations" element={<Dropofflocations />} />
              <Route path="/contactus" element={<Contactus />} />
              <Route path="/donors" element={<Donors />} />
              <Route path="/recipients" element={<Recipients />} />

            </Routes>
          </Col>
          </Row>
          </Container>
    </BrowserRouter>
    );
      /*}
      else {
        return (
          <BrowserRouter>
            <Container fluid>
            <Row>
              <Col >
                <LoginTopMenu /> 
              </Col>
            </Row>
              <Row>
              <Col xs={4} md={2}>
                <Sidebar />
              </Col>

                <Col xs={12} md={8}>
                  <Routes>                
                    <Route path="/MyProfile" element={<MyProfile />} />
                    <Route path="/createDonation" element={<createDonation />} />
                    <Route path="/listdonation" element={<Listdonation />} />
                    <Route path="/editdonation" element={<Editdonation />} />
                    <Route path="/deletedonation" element={<Deletedonation />} />
                  </Routes>
                </Col>
                </Row>
                </Container>
          </BrowserRouter>

        );
      }*/
}

export default App;
