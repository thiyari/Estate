import './common.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Header(props){

const [isLoggedIn,setIsLoggedIn] = useState(false)
const navigate = useNavigate()

axios.defaults.withCredentials = true;
useEffect(()=>{
axios.get('http://localhost:8000/api/session')
.then(res => {
  if(res.data.valid){
    setIsLoggedIn(props.LoginStatus);
  } 
})
.catch(err => console.log(err))
},[props]);


const logoutHandler = () => {
  axios.post('http://localhost:8000/api/logout')
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
  <img src={require('./banner.jpg')} height="150" width="100%" alt="banner"></img>
            <nav className="navbar navbar-expand-lg bg-body-tertiary border">
  <div className="container">
    <a className="navbar-brand" href="/"><i className='fa fa-fw fa-home'/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link"  href="#c">Plots</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#c">Flats</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#c">Commercial</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#s">Search</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="../Profile">My Account</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="../Register">Register</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#c">Contact us</a>
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