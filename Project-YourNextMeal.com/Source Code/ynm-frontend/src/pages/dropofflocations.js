import React, { useState,useContext,useEffect } from "react"
import Form from 'react-bootstrap/Form';
import { Context } from '../components/Context';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

function Dropofflocations() {


    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(Context);
    const { userInfo, setUserInfo } = useContext(Context);
    //const { isLoggedIn, userInfo } = useContext(Context);
    const [dropoffLocations, setDropoffLocations] = useState([]);
    const [message, setMessage] = useState("");

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

     
        let res =  fetch('http://localhost:8000/centers',{
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => 
            {
                console.log(data);
                var locations = [];
                for(var i=0; i < data.length; i++)
                {
                    var req = JSON.stringify(data[i]);
                    var parse = JSON.parse(req)
                    locations.push(parse);
                }
                setDropoffLocations(locations);
 
            }
        )
        .catch(err => console.log(err));
    },[]);

  

  return (
    
    <Table striped>
      <thead>
        <tr>
          <th>Location Name</th>
          <th>Location Address</th>
            <th>Location Contact</th>
            <th>Location Hours</th>
        </tr>
      </thead>
      <tbody>
      {dropoffLocations.map((item, index) => (
        <tr>
  
          <td>{item.LocationName}</td>
          <td>
            {JSON.parse(item.LocationAddress).Street1},
            <br></br>
            {JSON.parse(item.LocationAddress).City}
            <br></br>
            {JSON.parse(item.LocationAddress).Zipcode}
          </td>
          <td>{formatPhoneNumber(item.LocationContact)}</td>
          <td>{item.LocationHours}</td>

        </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Dropofflocations;