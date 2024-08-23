import React, { useState, useEffect, useCallback } from 'react'
import AdminSidebar from './Sidebar/AdminSidebar'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {properties} from '../properties.js'

function EmailForm(props){

  
  const initialState = {
    subject: "",
    message: "",
    subject_status: "",
    messsage_status: ""
  }

    const [loggedIn, setLoggedIn] = useState(false)
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const { email } = useParams()
    const [formError, setFormError] = useState({...initialState})
    const navigate = useNavigate()

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

      axios.defaults.withCredentials = true;
      useEffect(()=>{
        session();
      },[session])

       // Initialize an object to track input errors
      let inputError = {...initialState};

      const handleSubmit = async (e) => {
        e.preventDefault();

          // Check if subject is empty
          if(!subject){
            setFormError({
              ...inputError,
              subject: "Please enter the Subject",
              subject_status: "error"
            })
            return;
          }

          // Check if message is empty
          if(!message){
            setFormError({
              ...inputError,
              message: "Please type your message",
              message_status: "error"
            })
            return;
          }          

          // Clear any previous errors
          setFormError(inputError);

        try {
          await axios.post(properties.REACT_APP_SERVER_URI+'/api/send-email', JSON.stringify({
            to: email,
            subject: subject,
            message: message
          }),
          {
            headers:{
              "Content-Type":"application/json"
              }
          }).then((res) => {
            console.log(res)
            alert(res.data.output);
          });
          setSubject('')
          setMessage('')
          navigate('/AdminProfile')
        } catch(err) {
          alert(err);
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
              <div className="header-font">Email Form</div>
            </center>
          </h1>
            <div className="form-container">
            <div className="row">
             <div className="col-sm-4"></div>
             <div className="col-sm-4">
                <div className="card-body">        
        <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label className="form-label">Email</label>
          <input 
            className="form-control mb-3" 
            type="email"
            placeholder="To"
            value={email}
            readOnly
          />
          </div>
          <div className="form-group">
          <label className="form-label">Subject</label>
          <input
            className="form-control mb-3" 
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}  
            style={{borderColor: formError.subject_status !== "error" ?"":"red"}}
          />
          </div>
          <p className="error-message">{formError.subject}</p>

          <div className="form-group">
          <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea 
            className="form-control" 
            rows="3"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}  
            style={{borderColor: formError.message_status !== "error" ?"":"red"}}
          >  
          </textarea>
          </div>
          </div>
          <p className="error-message">{formError.message}</p>

          <div align="center">
          <button type="submit" className='btn btn-primary' style={{width: 150}}>Send Email</button>
          </div>
        </form>
        </div>
        </div>
        <div className="col-sm-4"></div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default EmailForm;
    