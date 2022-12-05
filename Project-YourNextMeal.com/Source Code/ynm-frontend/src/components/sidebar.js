import React from "react";
import {useNavigate} from 'react-router-dom';
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import './sidebar.css'
import "bootstrap/dist/css/bootstrap.min.css"

export default function navbar() {

    let isUserLoggedIn = localStorage.getItem('isLoggedIn');
    let email = localStorage.getItem('Email');
    let kind = localStorage.getItem('Kind');
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('Email');
        localStorage.removeItem('Kind');
        navigate('/home');
    }

 if (isUserLoggedIn && kind === "donor") {
    return (
        <>
    
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/home"
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link href="/MyProfile">My Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/createdonation">Create Donation</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/listdonations">My Donations</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/dropofflocations">Dropoff Centers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                 <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
            </Nav.Item>
            </Nav>
          
        </>
        )
    } else if (isUserLoggedIn && kind === "recipient") {
        return (
            <>
        
                <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                activeKey="/home"
                >
                    <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link href="/MyProfile">My Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/activedonations">Available Donations</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/myacceptdonations">My Accepted Donations</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/dropofflocations">Dropoff Centers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                </Nav.Item>
                </Nav>
              
            </>
            )
    }
   }
