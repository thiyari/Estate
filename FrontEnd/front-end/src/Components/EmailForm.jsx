import React, { useState, useEffect, useCallback } from 'react'
import AdminSidebar from './Sidebar/AdminSidebar'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function EmailForm(props){
    const [loggedIn, setLoggedIn] = useState(false)
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const { email } = useParams()

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

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/send-email`, JSON.stringify({
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
          />
          </div>
          <div className="form-group">
          <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea 
            className="form-control" 
            rows="3"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}  
          >  
          </textarea>
          </div>
          </div>
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
    