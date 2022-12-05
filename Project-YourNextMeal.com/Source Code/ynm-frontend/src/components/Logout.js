import React, { useState,useContext } from "react"
import Form from 'react-bootstrap/Form';
import { Context } from './Context';
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';


const Logout = () =>  {

  useEffect( () => {
    console.log("logout 1");
    localStorage.clear()
    console.log("logout 2");
    const navigate = useNavigate();
    navigate('/Home');
  }
  )

    return (
      <div className="container">
        Logout successfully
      </div>
    )
};
export default Logout;