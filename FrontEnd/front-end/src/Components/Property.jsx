import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import '../App.css'
import ImageSlider from './ImageSlider/ImageSlider'
import { FaEdit } from "react-icons/fa";

function Properties(props){
    const [loggedIn, setLoggedIn] = useState(false)
    const [Id, setId] = useState('')
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
    <div className='col-md-12'>

    <div className='row'>
        <div className='col-md-1'></div>
        <div className='col-md-5'>


        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Property Location</label></th>
            </tr>
            <tr>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="location" 
              placeholder="Enter your Property Location"
              name="location"
              readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button type="submit" style={{width:25}}><FaEdit /></button></td>
            </tr>
          </table>
        </div>




        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Type of Property</label></th>
            </tr>
            <tr>
              <td><input 
                  type="text"  
                  className="form-control mb-3" 
                  id="property" 
                  placeholder="Enter your Property Location"
                  name="property" 
                  readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button type="submit" style={{width:25}}><FaEdit /></button></td>
            </tr>
          </table>
        </div>



        </div>
        <div className='col-md-5'>

        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Area of Property</label></th>
            </tr>
            <tr>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="area" 
              placeholder="Area in Sq.Feet"
              name="area"
              readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button type="submit" style={{width:25}}><FaEdit /></button></td>
            </tr>
          </table>
        </div>



        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Price</label></th>
            </tr>
            <tr>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="price" 
              placeholder="Estimated Price"
              name="price"
              readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button type="submit" style={{width:25}}><FaEdit /></button></td>
            </tr>
          </table>
        </div>


        </div>
        <div className='col-md-1'></div>
      </div>

      <div className='row'>
      <div className="col-sm-3"></div>
      <div className="col-sm-6">

          <ImageSlider Id={Id} />

          </div> 
      </div> 
      <div className='row'>
        <div className='col-md-1'></div>
        <div className='col-md-4'>
          <div className='form-group'>
            <label className="form-label">Name</label>
            <input className="form-control" type="text"></input>
          </div>
        </div>
        <div className='col-md-2'></div>
        <div className='col-md-4'>
        <div className='form-group'>
          <label className="form-label">Password</label>
          <input className="form-control" type="text"></input>
        </div>
        </div>
        <div className='col-md-1'></div>
      </div>

    <div className="col-sm-3"></div>
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



