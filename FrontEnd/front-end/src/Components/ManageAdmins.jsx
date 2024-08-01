import AdminSidebar from './Sidebar/AdminSidebar'
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import axios from 'axios'

function ManageAdmins(props){

    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)
    const [Id, setId] = useState('')
    const [user, setUser] = useState('')

    const session = useCallback(async () =>{
      await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/session`)
      .then(res => {
        if(res.data.valid){
          setUser(res.data.username);
          setId(res.data.id);
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
              <div className="header-font">Admins Management</div>
            </center>
          </h1>
            <div className="form-container">
                <div className="card-body">
                <form>
          <div className="row">
          <div className="col-md-12">
          <div className='row'>
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
  
    
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th colSpan={2}>Operations</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
            </table>
            </div>
            <div className='col-md-3'></div>
            </div>
            </div>
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

export default ManageAdmins;