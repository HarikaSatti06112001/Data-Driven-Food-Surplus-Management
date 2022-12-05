import React, { useState,useContext,useEffect } from "react"
import Form from 'react-bootstrap/Form';
import { Context } from '../components/Context';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

const createdonation = () => {

    // const navigate = useNavigate();
    //const { isLoggedIn, userInfo } = useContext(Context);
    const { isLoggedIn, setIsLoggedIn } = useContext(Context);
    const { userInfo, setUserInfo } = useContext(Context);
   
    let [donationType, setDonationType] = useState('');
    let [donationQty, setDonationQty] = useState('');
    let [donationAllaergies, setDonationAllaergies] = useState('');
    let [donationDescription, setDonationDescription] = useState('');
    let [donationPickupDate, setDonationPickupDate] = useState('');
    let [donationPickupTime, setDonationPickupTime] = useState('');
    let [donationPickupAddressStreet1, setDonationPickupAddressStreet1] = useState('');
    let [donationPickupAddressStreet2, setDonationPickupAddressStreet2] = useState('');
    let [donationPickupAddressCity, setDonationPickupAddressCity] = useState('');
    let [donationPickupAddressState, setDonationPickupAddressState] = useState('');
    let [donationPickupAddressZipcode, setDonationPickupAddressZipcode] = useState('');
    let [donationContact, setDonationContact] = useState('');
    let [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Create Donation handleSubmit");
        var ls_user_email = localStorage.getItem('Email')

        var jsonData = {
            "username": ls_user_email,
            "DonationType": donationType,
            "DonationQty": donationQty,
            "DonationAllergies": donationAllaergies,
            "DonationDescription": donationDescription,
            "DonationPickupDate": donationPickupDate,
            "DonationPickupTime": donationPickupTime,
            "DonorAddress" : {
                "Street1" : donationPickupAddressStreet1,
                "Street2" : donationPickupAddressStreet2,
                "City" : donationPickupAddressCity,
                "State" : donationPickupAddressState,
                "Zipcode" : donationPickupAddressZipcode
            },
            "DonorContact": donationContact,
        }
        console.log (jsonData);
    
        let res =  fetch('http://localhost:8000/createdonationrequest',{
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        })
        .then(res => res.json())
        .then(data =>
        {
                console.log(data);
                setMessage("Donation Created Successfully");
        })
        .catch(err => console.log(err));

    }

    return (
       
       <div className="container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Create Donation Request</h3>

            <div className="message">{message ? <p>{message}</p> : null}</div>
            
            <div className="form-group mt-3">
              <label>Select User Type</label>
              <p></p>
              <Form.Select aria-label="Default select example" onChange={(e) => setDonationType(e.target.value)} >
                  <option>Open this select menu</option>
                  <option value="Meals">Meals</option>
                  <option value="Meals">Grocery</option>
                 <option value="Other">Other</option>
            </Form.Select>
            `</div>
     
            <div className="form-group mt-3">
              <label>Donation Qty</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Quantity" onChange={(e) => setDonationQty(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Allergies</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Allergies" onChange={(e) => setDonationAllaergies(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Donation Description</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Description" onChange={(e) => setDonationDescription(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Pickup Date & Time (YYYY-MM-DD HH:MM)</label>
              <input type="text" className="form-control mt-1" placeholder="Pickup Date" onChange={(e) => setDonationPickupDate(e.target.value)} />
              <input type="text" className="form-control mt-1" placeholder="Pickup Time" onChange={(e) => setDonationPickupTime(e.target.value)} />
            </div>
            <div className="form-group mt-3">
              <label>Pickup Street Address</label>
              <input type="text" className="form-control mt-1" placeholder="Street Address" onChange={(e) => setDonationPickupAddressStreet1(e.target.value)} />
            </div>
            <div className="form-group mt-3">
              <label>City</label>
              <input type="text" className="form-control mt-1" placeholder="City" onChange = {(e) => setDonationPickupAddressCity(e.target.value)} />
            </div>
            <div className="form-group mt-3">
              <label>State</label>
              <input type="text" className="form-control mt-1" placeholder="State" onChange={(e) => setDonationPickupAddressState(e.target.value)} />
            </div>
            <div className="form-group mt-3">
              <label>Zip Code</label>
              <input type="text" className="form-control mt-1" placeholder="Zip Code" onChange={(e) => setDonationPickupAddressZipcode(e.target.value)} />
            </div>
            <div className="form-group mt-3">
              <label>Donor Contact Number</label>
              <input type="text" className="form-control mt-1" placeholder="Contact Number" onChange={(e) => setDonationContact(e.target.value)} />
            </div>
  
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          

          </div>
        </form>
      </div>
    )
};

export default createdonation;
