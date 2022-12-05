import React, { useState,useContext } from "react"
import Form from 'react-bootstrap/Form';
import { Context } from './Context';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from "axios";


export default function (props) {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [kind, setKind] = useState('')
    let [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(Context);
    const { userInfo, setUserInfo } = useContext(Context);

    let handleSubmit = async (e) => {
        e.preventDefault();
        var jsonData = {
            "Kind": kind,
            "Email": email,
            "Password": password
        }
        console.log(JSON.stringify(jsonData));

        let res = await fetch('http://localhost:8000/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonData)
      });
        let data = await res.json();
        console.log(data);
        if (res.status === 200) {
            userInfo.user_email = email;
            userInfo.user_kind = kind;
            setUserInfo(userInfo);
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("Email", email);
            localStorage.setItem("Kind", kind);
            navigate('/MyProfile');

        } else {
            setMessage("Invalid credentials. Please try again.");
        }
        // axios.post('http://localhost:8000/login', jsonData,{withCredentials: true },{ mode: 'cors'},{ headers: 
        // {'Content-Type': 'application/json'
        // }})
        // .then((response) => {
        //     console.log(response);
        //     if (response.status === 200) {
        //         userInfo.user_email = email;
        //         userInfo.user_kind = kind;
        //         setUserInfo(userInfo);
        //         setIsLoggedIn(true);
        //         localStorage.setItem("isLoggedIn", true);
        //         localStorage.setItem("Email", email);
        //         localStorage.setItem("Kind", kind);
        //         navigate('/MyProfile');
        //     } else {
        //         setMessage("Invalid credentials. Please try again.");
        //     }
        // })
        // .catch((error) => {
        //     console.log(error);
        //       setMessage("Server Error. Please try again.");
        // })

    }

    return (
      <div className="container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary">
                Sign Up
              </span>
            </div>
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <div className="form-group mt-3">
                <label>Select User Type</label>
                <p></p>
                <Form.Check name="grouped" required inline label="Donor" type='radio' onChange={() => setKind('donor')} />
                <input type="hidden" name="type" value="individual" />
                <Form.Check name="grouped" required inline label="Recipient" type='radio' onChange={() => setKind('recipient')} />
            `</div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>

            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }