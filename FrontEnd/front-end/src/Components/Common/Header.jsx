import './common.css'
import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'


function Header(props){

const [isLoggedIn,setIsLoggedIn] = useState(false)
const [logstatus, setLogstatus] = useState('')
const navigate = useNavigate()

const session = useCallback(async () => {
  await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/session`)
  .then(res => {
    if(res.data.valid){
      setIsLoggedIn(props.LoginStatus);
      setLogstatus(props.LoginStatus)
    } 
  })
  .catch(err => console.log(err))
},[props])

axios.defaults.withCredentials = true;
useEffect(()=>{
  session();
},[session]);


const logoutHandler = () => {
  axios.post(`${process.env.REACT_APP_SERVER_URI}/api/logout`)
  .then(res => {
    if(res.data.valid){
      alert("Logout Successful")
      navigate('/Login')
    } else {
      alert("Logout Failed")
    }
  })
  .catch(err => console.log(err))

};
  return(
        <React.Fragment>
  <nav className="navbar navbar-expand-lg bg-white border">
  <div className="container">
    <a className="navbar-brand" href="/"><i className='fa fa-fw fa-home'/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link"  href="../Plots">Plots</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="../Houses">Houses</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="../Commercial">Commercial</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="../Search">Search</a>
        </li>
        <li className="nav-item">
          { logstatus === "admin" ?
          (<a className="nav-link" href="../AdminProfile">My Account</a>)  :      
          (<a className="nav-link" href="../Profile">My Account</a>)  }      
        </li>
        <li className="nav-item">
          <a className="nav-link" href="../Register">Register</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="../ContactUs">Contact us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#a">About us</a>
        </li>
        <li className="nav-item">
          {  isLoggedIn ?
              (<form className="d-flex">
                  <button id="logout" className="btn btn-outline-success" type="submit" onClick={logoutHandler}>Logout</button>
              </form>)
              :
              (<form className="d-flex" action='../Login'>
                  <button id="login" className="btn btn-outline-success" type="submit">Login</button>
              </form>)              
            }

        </li>
      </ul>
    </div>
  </div>
</nav>
        </React.Fragment>
    );
}

export default Header;