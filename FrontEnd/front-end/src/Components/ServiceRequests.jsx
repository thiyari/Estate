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


      const records = useCallback(async()=>{
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/contacts`)
            .then(res => {
                const records = res.data.records.filter((doc)=>(doc.requests !== "general"))
                console.log(records)
            })
    },[]);

      axios.defaults.withCredentials = true;
      useEffect(()=>{
        session();
        records();
      },[session, records])


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
              <div className="header-font">Manage Service Requests</div>
            </center>
          </h1>
            <div className="form-container">
                <div className="card-body">
                <form>
                <div className ="table-responsive-md">  
                  <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Property ID</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">

                    </tbody>
                    </table>
                    </div>
                </form>
                </div>       
            </div>
            </div>
        </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default ServiceRequests;

