import AdminSidebar from './Sidebar/AdminSidebar'
import React, { useState, useEffect, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import { FaEdit } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoIosMail } from "react-icons/io";
import { properties } from '../properties.js'

function ManageUsers(props){

    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)
    const [profiles, setProfiles] = useState([{}])
    const [search, setSearch] = useState('');

    const session = useCallback(async () =>{
      await axios.get(properties.REACT_APP_SERVER_URI+'/api/session')
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
        await axios.get(properties.REACT_APP_SERVER_URI+'/api')
            .then(res => {
                let profiles_doc = res.data.records
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

    const handleDelete = async (fname, lname, Id) => {
      if(window.confirm(`Are you sure deleting this current ${fname} ${lname}!`)){
      try{
        await axios.delete(properties.REACT_APP_SERVER_URI+`/api/profile/delete/${Id}`, 
          { headers: { "Content-Type":"application/json" } })
          alert(`${fname} ${lname} Deleted Successfully`);
          window.location.reload();
        } catch (err) {
          alert(err);
        }
      }
    };

    return(
        <React.Fragment>
        <div className="row">
        <div className="col-md-2">        
          <AdminSidebar/>
        </div>
        <div className="col-md-10" style={{paddingLeft: 30}}>
      
      
        <div className="container mt-4" >
          <div className="card">
          <h1 className="card-header">
            <center>
              <div className="header-font">Users Management</div>
            </center>
          </h1>
            <div className="form-container">
                <div className="card-body">

          <div className="row">
          <div className="col-md-12">
          <div className='row'>
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
          <Form>
            <InputGroup className='my-3'>

              {/* onChange for search */}
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search using Property ID'
              />
            </InputGroup>
          </Form>
          <div className ="table-responsive-md" style={{ maxHeight: "410px", overflowY: "auto" }}>  
          <form>
          <table className="table table-striped table-hover">
            <thead style={{ position: "sticky", top: "0" }}>
              <tr>
                <th scope="col">Property ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th colSpan={3} style={{textAlign: "center"}}>Operations</th>
              </tr>
            </thead>
            <tbody className="table-group-divider" >
              {profiles
                .filter((doc) => {
                  return (search === ''
                  ? doc
                  : doc.propertyid.includes(search))
                }).map((profile, index)=>{ return(
                    <tr key={index}>
                        <td>{profile.propertyid}</td>
                        <td>{profile.firstname}</td>
                        <td>{profile.lastname}</td>
                        <td>{profile.email}</td>
                        <td>{profile.phone}</td>
                        <td align='right'><NavLink exact="true" to={`/EditUsers/${profile.propertyid}`} ><FaEdit /></NavLink></td>
                        <td align='right'><NavLink exact="true" to={`/EmailForm/${profile.email}`} ><IoIosMail size={20}/>
                        </NavLink></td>
                        <td align='center'><button style={{width: 25}} onClick={(e)=>{
                          e.preventDefault()
                          handleDelete(profile.firstname, profile.lastname, profile._id)}}><i className="fas fa-trash-alt"></i></button></td>
                    </tr>
              )}
            )}
            </tbody>
            </table>
            </form>
            </div>
            </div>
            <div className='col-md-1'></div>
            </div>
            </div>
            </div>
                </div>
            </div>
           </div>
        </div>
        </div>
        </div>
        </React.Fragment>
        )
}

export default ManageUsers;