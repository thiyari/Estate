import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import '../App.css'

function Properties(props){
    const [loggedIn, setLoggedIn] = useState(false)
    const [Id, setId] = useState('')
    const [images,setImages] = useState([])
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(()=>{
      axios.get('http://localhost:8000/api/session')
      .then(res => {
        if(res.data.valid){
          setId(res.data.id);
          setLoggedIn(res.data.isLoggedIn);
          props.LoginStatus(loggedIn);
        } else {
          props.LoginStatus(!loggedIn);
          navigate('/Login')
        }
      })
      .catch(err => console.log(err))


   
      axios.get(`http://localhost:8000/api/profile/${Id}`)
      .then(res => {
        if(res.data.status){
          const profile_doc = res.data.profile          
          setImages(profile_doc.data[0].images)
        } 
      })
      .catch(err => console.log(err))


    },[navigate, props, Id, loggedIn])
  

    return(
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
        <div className="header-font">Property Details</div>
      </center>
    </h1>
			<div className="form-container">
        <div className="card-body">
    <form>
      <div className="row">
      <div className="col-md-12">
      <div className='row'>
      <div className="col-sm-3"></div>
      <div className="col-sm-6">
      
        {images.map((image, key)=>{ 
          return(
              <img src={image} key={key} alt={image} width="500px" height="300px"/>
            )
              }
          )}

          </div> 
          </div> 
          <div className="col-sm-3"></div>

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
    )
}

export default Properties;



