import AdminSidebar from './Sidebar/AdminSidebar'
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

function ManageAdmins(props){

    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)
    const [profiles, setProfiles] = useState([{}])

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
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/admin/profiles`)
            .then(res => {
                let profiles_doc = res.data.records
                console.log(profiles_doc)
                    let profiles_list = []
                    for (let i = 0; i < profiles_doc.length;  i++) {
                        profiles_list.push(profiles_doc[i])
                    }
                    setProfiles(profiles_list)
            })
    },[]);


    axios.defaults.withCredentials = true;
    useEffect(()=>{
      session();
      records();
    },[session,records])


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
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
  
    
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th colSpan={2}><button className="btn btn-primary" style={{width: 100, height: 35}}>Add New</button></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {profiles.map((profile, index)=>{return(
                    <tr key={index}>
                        <td>{profile.firstname}</td>
                        <td>{profile.lastname}</td>
                        <td>{profile.username}</td>
                        <td>{profile.email}</td>
                        <td>{profile.phone}</td>
                        <td><FaEdit /></td>
                        <td><RiDeleteBin6Fill /></td>
                    </tr>
              )}
            )}
            </tbody>
            </table>
            </div>
            <div className='col-md-1'></div>
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