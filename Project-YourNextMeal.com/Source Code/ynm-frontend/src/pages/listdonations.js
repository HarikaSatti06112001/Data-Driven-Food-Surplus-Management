import React, { useState,useContext,useEffect } from "react"
import Form from 'react-bootstrap/Form';
import { Context } from '../components/Context';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

function Listdonations() {


    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(Context);
    const { userInfo, setUserInfo } = useContext(Context);
  
    //const { isLoggedIn, userInfo } = useContext(Context);
    const [donations, setDonations] = useState([]);
    const [message, setMessage] = useState("");

    useEffect( () => {
        console.log("useEffect");
        console.log(userInfo);
        console.log(isLoggedIn);
        
        var ls_isLoggedIn = localStorage.getItem('isLoggedIn')
        var ls_user_email = localStorage.getItem('Email')
        var ls_usertype = localStorage.getItem('Kind')

        var jsonData = {
            "Kind": userInfo.user_kind,
            "Email": userInfo.user_email
        }
        console.log(jsonData);

        let res =  fetch('http://localhost:8000/viewcurrentrequests?username='+ls_user_email,{
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

    function handleRemove(request_id) {
        console.log("handleRemove" + donations);
        console.log(request_id);

        var jsonData = {
            "RequestId": request_id
          }
          console.log(jsonData)
          console.log('before fetch')
          let res = fetch('http://localhost:8000/canceldonationrequest', {
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
                setMessage(data.message);
                const newList = donations.filter((item) => item.RequestId !== request_id);
                console.log(newList);
                setDonations(newList);
                setMessage("Donation request deleted successfully ");
            })
            .catch(err => console.log(err));
    }

    function handleUpdate(request_id) {
      console.log("handleUpdate" + donations);
      console.log(request_id);

      var jsonData = {
          "RequestId": request_id
        }
        console.log(jsonData)
        console.log('before fetch')
        let res = fetch('http://localhost:8000/updatedonationrequest', {
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
              setMessage(data.message);
              const newList = donations.filter((item) => item.RequestId !== request_id);
              console.log(newList);
              setDonations(newList);
              setMessage("Donation request status changed to active");
          })
          .catch(err => console.log(err));
      }


  return (
    
    <Table striped>
      <thead>
        <tr><div className="message">{message ? <p>{message}</p> : null}</div></tr>
        <tr>
          <th>Actions</th>
          <th>Donation Type</th>
            <th>Description</th>
          <th>Pickup Date & Time</th>
          <th>Address</th>
          <th>Pickup Accepted By</th>
          <th>Status</th>

        </tr>
      </thead>
      <tbody>
      {donations.map((item, index) => (
        <tr>
          <td>
            {item.RequestCurrentStatus === "Cancelled" ? <button type="button" className="btn btn-primary" onClick={() => handleUpdate(item.RequestId)}>Update</button> : <button type="button" className="btn btn-primary" onClick={() => handleRemove(item.RequestId)}>Delete</button>}
          </td>
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
          <td>{item.RequestAcceptedBy === null?'': item.RequestAcceptedBy} </td>
          <td>{item.RequestCurrentStatus}</td>
        </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Listdonations;