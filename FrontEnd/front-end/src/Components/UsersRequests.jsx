import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminSidebar from "./Sidebar/AdminSidebar";
import { MdPendingActions } from "react-icons/md";

function UsersRequests(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [profiles, setProfiles] = useState([{}])
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
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/approvals`)
            .then(res => {
                let profiles_doc = res.data.records
                    let profiles_list = []
                    for (let i = 0; i < profiles_doc.length;  i++) {
                        profiles_list.push(profiles_doc[i])
                    }
                    setProfiles(profiles_list)
            })
      },[]);

      const handleDelete = async (fname, lname, Id) => {
        if(window.confirm(`Are you sure deleting this current ${fname} ${lname}!`)){
        try{
          await axios.delete(`${process.env.REACT_APP_SERVER_URI}/api/profile/delete/${Id}`, 
            { headers: { "Content-Type":"application/json" } })
            alert(`${fname} ${lname} Deleted Successfully`);
            window.location.reload();
          } catch (err) {
            alert(err);
          }
        }
      };

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
        <div className="col-md-10" style={{paddingLeft: 30}}>
      
      
        <div className="container mt-4" >
          <div className="card">
          <h1 className="card-header">
            <center>
              <div className="header-font">Manage Users Requests</div>
            </center>
          </h1>
            <div className="form-container">
                <div className="card-body"> 
                <form>     
                <div className ="table-responsive-md">  
                  <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                      <th scope="col">Property ID</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th colSpan={2} style={{textAlign: "center"}}>Operations</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {profiles.map((profile, index)=>{return(
                    <tr key={index}>
                    <td>{profile.propertyid}</td>
                    <td>{profile.firstname}</td>
                    <td>{profile.lastname}</td>
                    <td>{profile.email}</td>
                    <td>{profile.phone}</td>
                    <td align='right'><NavLink exact="true" to={`/Approvals/${profile.propertyid}`} ><MdPendingActions size={20}/>
                    </NavLink></td>
                    <td align='center'><button style={{width: 25}} onClick={(e)=>{
                          e.preventDefault()
                          handleDelete(profile.firstname, profile.lastname, profile._id)}}><i className="fas fa-trash-alt"></i></button></td>
                </tr>
                      )}
                    )}
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

export default UsersRequests;

