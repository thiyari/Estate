import Sidebar from './Sidebar/Sidebar'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function ChangePassword(props){
  const [user, setUser] = useState('')
  const navigate = useNavigate();
  const initialState = {
    old_password:"",
    new_assword:"",
    confirm_new_password:"",
    old_password_status: "",
    new_password_status: "",
    confirm_new_password_status: "",
  }

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:8000/user/session')
    .then(res => {
      if(res.data.valid){
        setUser(res.data.username);
        props.onLogin(true)
      } else {
        props.onLogin(false)
        navigate('/Login')
      }
    })
    .catch(err => console.log(err))
  },[navigate, props])


return (
  <React.Fragment>
  <div className="row">
  <div className="col-md-2">        
    <Sidebar/>
  </div>
  <div className="col-md-10">


  <div className="container mt-4" >
    <div className="card">
    <h1 className="card-header">
      <center>
        <div className="header-font">Change Password for {user}</div>
      </center>
    </h1>
			<div className="form-container">
        <div className="card-body">
    <form onSubmit={""}>
      <div className="row">
      <div className="col-md-12">
      <div className='row'>
      <div className="col-sm-4"></div>
      <div className="col-sm-4">
      <div className="form-group">
          <label className="form-label">Old Password</label>
          <input 
          type="password"  
          className="form-control mb-3" 
          id="old_password" 
          placeholder="Enter Old Password"
          name="old_password"
          value=""
          onChange=""
          />
          </div>
        <p className="error-message">{""}</p>




      <div className="form-group">
          <label className="form-label">New Password</label>
          <input 
          type="password"  
          className="form-control mb-3" 
          id="new_password" 
          placeholder="Enter New Password"
          name="new_password"
          value=""
          onChange=""
          />
          </div>
        <p className="error-message">{""}</p>




        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input 
          type="password"  
          className="form-control mb-3" 
          id="confirm_new_Password" 
          placeholder="Confirm New Password"
          name="confirm_new_Password"
          value=""
          onChange="" 
          />
          </div>
        <p className="error-message">{""}</p>



        <div align="center">
          <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </div>

          </div> 
          </div> 
          <div className="col-sm-4"></div>

        </div>
        </div>
        </form>
      </div>
      </div>

      <div className="card-footer text-muted">
            <p>
              Already registered?<br />
              <span className="line">
              <a href="/Login">Sign In</a>
              </span>
            </p>      
      </div>
      </div>
      </div>
    </div>
</div>
</React.Fragment>
);
}

export default ChangePassword;