import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./Sidebar/AdminSidebar";

function ServiceRequests(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()
    const session = useCallback(async () =>{
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/session`)
        .then(res => {
          if(res.data.valid){
            setLoggedIn(res.data.isLoggedIn);
            props.LoginStatus(loggedIn);
          } else {
            props.LoginStatus(!loggedIn);
            navigate('/Login')
          }
        })
        .catch(err => console.log(err))
      },[props, loggedIn, navigate])

      axios.defaults.withCredentials = true;
      useEffect(()=>{
        session();
      },[session])


    return(
        <React.Fragment>
        <div className="row">
        <div className="col-md-2">        
          <AdminSidebar/>
        </div>
        <div className="col-md-10">
      
      
        <div className="container mt-4" >
          <div className="card">
          <h1 className="card-header">
            <center>
              <div className="header-font">Managing Service Requests</div>
            </center>
          </h1>
            <div className="form-container">
                <div className="card-body"></div>       

            </div>
            </div>
        </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default ServiceRequests;

