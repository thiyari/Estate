import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./Sidebar/AdminSidebar";

function ContactsRequests(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [contacts, setContacts] = useState([])
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
                const records = res.data.records
                let contacts_list = []
                for (let i = 0; i < records.length;  i++) {
                    contacts_list.push(records[i])
                }
                setContacts(contacts_list)
            })
    },[]);


    const handleDelete = async (fname, lname, Id) => {
      if(window.confirm(`Are you sure deleting this current contact ${fname} ${lname}!`)){
      try{
        await axios.delete(`${process.env.REACT_APP_SERVER_URI}/api/contacts/delete/${Id}`, 
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
              <div className="header-font">List of Contact Us Requests</div>
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
                      <th scope="col">Message</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {contacts.filter((doc)=>(doc.requests === true))
                        .map((contact, index)=>{return(
                                            <tr key={index}>
                                              <td>{contact.firstname}</td>
                                              <td>{contact.lastname}</td>
                                              <td>{contact.email}</td>
                                              <td>{contact.phone}</td>
                                              <td>{contact.comments}</td>
                                              <td align='center'><button style={{width: 25}} onClick={(e)=>{
                                                e.preventDefault()
                                                handleDelete(contact.firstname, contact.lastname, contact._id)
                                                }}><i className="fas fa-trash-alt"></i></button></td>
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

export default ContactsRequests;

