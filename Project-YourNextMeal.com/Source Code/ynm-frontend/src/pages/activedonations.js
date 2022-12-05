import React, { useState,useContext,useEffect } from "react"
import Form from 'react-bootstrap/Form';
import { Context } from '../components/Context';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

function Activedonations() {


    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(Context);
    const { userInfo, setUserInfo } = useContext(Context);
    //const { isLoggedIn, userInfo } = useContext(Context);
    const [donations, setDonations] = useState([]);
    const [message, setMessage] = useState("");
    let ls_user_email = localStorage.getItem('Email')

    let formatPhoneNumber = (str) => {
      //Filter only numbers from the input
      let cleaned = ('' + str).replace(/\D/g, '');
      
      //Check if the input is of correct length
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
      };
    
      return null
    };

    useEffect( () => {
        console.log("useEffect");
        console.log(userInfo);
        console.log(isLoggedIn);

        var jsonData = {
            "Kind": userInfo.user_kind,
            "Email": userInfo.user_email
        }
        console.log(jsonData);

        let res =  fetch('http://localhost:8000/viewactiverequests',{
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => 
            {
                console.log(data);
                var donationsArray = [];
                for(var i=0; i < data.length; i++)
                {
                    var req = JSON.stringify(data[i]);
                    var parse = JSON.parse(req)
                    donationsArray.push(parse);
                }
                setDonations(donationsArray);
 
            }
        )
        .catch(err => console.log(err));
    },[]);

    function handleAccept(request_id) {
      console.log(" Activedonations handleAccept");
      console.log(request_id);
      console.log(ls_user_email);
     

      var jsonData = {
          "RequestId": request_id,
          "username": ls_user_email
        }
        console.log(jsonData)
        console.log('before fetch')
        let res = fetch('http://localhost:8000/acceptdonationrequest', {
              method: 'POST',
              mode: 'cors',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(jsonData)
          })
          .then(res => res.json())
          .then(data => {
              console.log(data);
              const newList = donations.filter((item) => item.RequestId !== request_id);
              console.log(newList);
              setDonations(newList);
              setMessage("Donation request Accepted successfully. Please check this request in the Acceped Donations page.");
          })
          .catch(err => console.log(err));
  }


  return (
    <Table striped>
      <thead>
        <tr>
          <th>Actions</th>
          <th>Donation Type</th>
            <th>Description</th>
          <th>Pickup Date & Time</th>
          <th>Pickup Address</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
      {donations.map((item, index) => (
        <tr>
          <td>  {item.RequestCurrentStatus != "Accepted" ? <button type="button" className="btn btn-primary" onClick={() => handleAccept(item.RequestId)}>Accept</button> : ''}</td>
          <td>{item.DonationType}</td>
          <td>{item.DonationDescription}</td>
          <td>{item.DonationPickupDate} {item.DonationPickupTime}</td>
          <td>
            {JSON.parse(item.DonorAddress).Street1},
            <br></br>
            {JSON.parse(item.DonorAddress).City}
            <br></br>
            {JSON.parse(item.DonorAddress).Zipcode}
          </td>
          <td>{formatPhoneNumber(item.DonorContact)}</td>
        </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Activedonations;