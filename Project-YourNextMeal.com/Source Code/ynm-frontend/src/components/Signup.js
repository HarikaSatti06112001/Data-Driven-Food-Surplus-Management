import React, { useState } from "react"
import Form from 'react-bootstrap/Form';

export default function (props) {

  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [userType, setUserType] = useState('')
  let [type, setType] = useState('individual')
  let [street1, setStreet1] = useState('')
  let [street2, setStreet2] = useState('')
  let [city, setCity] = useState('')
  let [state, setState] = useState('')
  let [zip, setZip] = useState('')
  let [contact, setContact] = useState('')
  let [kind, setKind] = useState('')
  let [isLoggedin, setIsLoggedin] = useState(false);
  let [message, setMessage] = useState('');

  
  let handleSubmit = async (e) => {
    e.preventDefault();
    var jsonData = {
      "Kind": kind,
      "Type": type,
      "Name": name,
      "PocName": "",
      "Address": {
        "Street1": street1,
        "Street2": "",
        "City": city,
        "State": state,
        "Zipcode": zip
      },
      "Contact": contact,
      "Email": email,
      "Password": password,
    }
  
    let res = await fetch('http://localhost:8000/signup', {
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
        setMessage("Account created successfully");
        setName('');
        setEmail('');
        setPassword('');
        setType('individual');
        setStreet1('');
        setCity('');
        setState('');
        setZip('');
        setContact('');
        
      } else {
        setMessage("Account creation failed");
      }
  }


  return (
    <div className="container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" >
              Sign In
            </span>
          </div>
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
              placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password" onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="name"
              className="form-control mt-1"
              placeholder="e.g Jane Doe or Organization Name" onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Street Address</label>
            <input type="text" className="form-control mt-1" placeholder="Street Address" onChange={(e) => setStreet1(e.target.value)} />
          </div>
          <div className="form-group mt-3">
            <label>City</label>
            <input type="text" className="form-control mt-1" placeholder="City" onChange = {(e) => setCity(e.target.value)} />
          </div>
          <div className="form-group mt-3">
            <label>State</label>
            <input type="text" className="form-control mt-1" placeholder="State" onChange={(e) => setState(e.target.value)} />
          </div>
          <div className="form-group mt-3">
            <label>Zip Code</label>
            <input type="text" className="form-control mt-1" placeholder="Zip Code" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className="form-group mt-3">
            <label>Contact Number</label>
            <input type="text" className="form-control mt-1" placeholder="Contact Number" onChange={(e) => setContact(e.target.value)} />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          
          <div className="message">{message ? <p>{message}</p> : null}</div>

          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}