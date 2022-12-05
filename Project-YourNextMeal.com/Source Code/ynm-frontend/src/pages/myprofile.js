import React, { useState,useContext,useEffect } from "react"
import Form from 'react-bootstrap/Form';
import { Context } from '../components/Context';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from "axios";



const MyProfile = () => {

    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(Context);
    const { userInfo, setUserInfo } = useContext(Context);
    //const { isLoggedIn, userInfo } = useContext(Context);
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [type, setType] = useState('individual')
    let [street1, setStreet1] = useState('')
    let [city, setCity] = useState('')
    let [state, setState] = useState('')
    let [zip, setZip] = useState('')
    let [contact, setContact] = useState('')
    let [kind, setKind] = useState('')
    let ls_isLoggedIn = localStorage.getItem('isLoggedIn')
    let ls_useremail = localStorage.getItem('Email')
    let ls_usertype = localStorage.getItem('Kind')


    useEffect( () => {
        console.log("useEffect");
        console.log(userInfo);
        console.log(isLoggedIn);
        console.log(ls_isLoggedIn);
        console.log(ls_useremail);
        console.log(ls_usertype);

        var jsonData = {
            "Kind": userInfo.user_kind,
            "Email": userInfo.user_email
        }
        console.log(jsonData);

        let res =  fetch('http://localhost:8000/viewprofile?username='+ls_useremail+'&usertype='+ls_usertype,{
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        })
        // axios.get('http://localhost:8000/viewprofile',{withCredentials: true },{ mode: 'cors'} , { headers: 
        //   {'Content-Type': 'application/json'
        //   }})
        .then(res => res.json())
        .then(data => 
            {
                console.log(data);
                console.log(data.Address);
                console.log();
                setName(data.Name);
                setEmail(data.Email);
                setType(data.Type);
                setStreet1(JSON.parse(data.Address).Street1);
                setCity(JSON.parse(data.Address).City);
                setState(JSON.parse(data.Address).State);
                setZip(JSON.parse(data.Address).Zipcode);
                setContact(data.Contact);
                setKind(data.Kind);
                
            }
        )
        .catch(err => console.log(err));
    },[]);

    return (
        <div className="container">
        <form className="Auth-form">
          <div className="Auth-form-content">
           

            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address" value={email} readOnly
              />
            </div>
       
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="name"
                className="form-control mt-1"
                placeholder="e.g Jane Doe or Organization Name" value={name} readOnly
              />
            </div>
            <div className="form-group mt-3">
              <label>Street Address</label>
              <input type="text" className="form-control mt-1" placeholder="Street Address" value={street1} readOnly/>
            </div>
            <div className="form-group mt-3">
              <label>City</label>
              <input type="text" className="form-control mt-1" placeholder="City" value={city}  readOnly/>
            </div>
            <div className="form-group mt-3">
              <label>State</label>
              <input type="text" className="form-control mt-1" placeholder="State" value={state}  readOnly/>
            </div>
            <div className="form-group mt-3">
              <label>Zip Code</label>
              <input type="text" className="form-control mt-1" placeholder="Zip Code" value={zip} readOnly/>
            </div>
            <div className="form-group mt-3">
              <label>Contact Number</label>
              <input type="text" className="form-control mt-1" placeholder="Contact Number" value={contact} readOnly/>
            </div>
  
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary">
                Edit Profile
              </button>
            </div>
            </div>
        </form>
        </div>
    )
};

export default MyProfile;