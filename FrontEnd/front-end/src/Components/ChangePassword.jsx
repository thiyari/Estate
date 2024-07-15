import Sidebar from './Sidebar/Sidebar'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function ChangePassword(props){
  const [user, setUser] = useState('')
  const navigate = useNavigate();

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
        <div className="header-font">Change Password {user}</div>
      </center>
    </h1>
			<div className="form-container">
        <div className="card-body">
    <form onSubmit={""}>
      <div className="row">
      <div className="col-md-12">

      <div className="form-group">
          <label className="form-label">Password</label>
          <input 
          type="password"  
          className="form-control mb-3" 
          id="password" 
          placeholder="Password"
          name="password"
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
          id="confirmPassword" 
          placeholder="Confirm Password"
          name="confirmPassword"
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