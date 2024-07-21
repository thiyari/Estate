import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import '../App.css'
import ImageSlider from './ImageSlider/ImageSlider'
import { FaEdit, FaCheck } from "react-icons/fa";


const initialState = {
  propertylocation: "",
  propertyLocation_status: "",
}

function Properties(props){
    const [loggedIn, setLoggedIn] = useState(false)
    const [Id, setId] = useState('')
    const navigate = useNavigate()

    const [propertyLocation, setPropertyLocation] = useState('')
    const [propertyArea, setPropertyArea] = useState('')
    const [propertyType, setPropertyType] = useState('')
    const [phase, setPhase] = useState('')
    const [rooms, setRooms] = useState('')
    const [floor, setFloor] = useState('')
    const [currency, setCurrency] = useState('')
    const [price, setPrice] = useState('')
    const [zip, setZip] = useState('')
    const [propertyAddress, setPropertyAddress] = useState('')

    const [formError, setFormError] = useState({...initialState})
    const [propertyLocationtoggle,setPropertylocationtoggle] = useState(false)

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
          setPropertyLocation(profile_doc.data[0].location)
          setPropertyArea(profile_doc.data[0].area)
          setPropertyType(profile_doc.data[0].property)
          setPhase(profile_doc.data[0].phase)
          setRooms(profile_doc.data[0].rooms)
          setFloor(profile_doc.data[0].floor)
          setCurrency(profile_doc.data[0].currency)
          setPrice(profile_doc.data[0].price)
          setZip(profile_doc.data[0].zip)
          setPropertyAddress(profile_doc.data[0].address)
        } 
      })
      .catch(err => console.log(err))

    },[navigate, props, Id, loggedIn])
  
 // Initialize an object to track input errors
 let inputError = {...initialState};

    const handlePropertyLocationInput = (event) => {
      event.preventDefault()
      setPropertyLocation(event.target.value);
    };
  
    const handlePropertyLocationEdit = (event) => {
      event.preventDefault()
      setPropertylocationtoggle(true)
    };

    const handlePropertyLocationSubmit = async (event) => {
      event.preventDefault()

          // Check if property location is empty
          if(!propertyLocation){
            setFormError({
              ...inputError,
              propertyLocation: "Location should not be empty",
              propertyLocation_status: "error"
            })
            return;
          }

      setPropertylocationtoggle(false)
    }

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
              {propertyLocationtoggle?<>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="location" 
              placeholder="Enter your Property Location"
              name="location"
              value={propertyLocation}
              onChange={handlePropertyLocationInput}
              style={{borderColor: formError.propertyLocation_status !== "error" ?"":"red"}}
              /></td>
              <td style={{verticalAlign: "top"}}><button onClick={handlePropertyLocationSubmit} type="submit" style={{width:25}}><FaCheck /></button></td>
              </>:
              <>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="location" 
              placeholder="Enter your Property Location"
              name="location"
              value={propertyLocation}
              readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button onClick={handlePropertyLocationEdit} type="submit" style={{width:25}}><FaEdit /></button></td>
              </>}
              </tr>
              <p className="error-message">{formError.propertyLocation}</p>
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
                  placeholder="Select your Property type"
                  name="property"
                  value={propertyType} 
                  readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button type="submit" style={{width:25}}><FaEdit /></button></td>
            </tr>
          </table>
        </div>


        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Rooms</label></th>
            </tr>
            <tr>
              <td><input 
                  type="text"  
                  className="form-control mb-3" 
                  id="rooms" 
                  placeholder="Select Rooms"
                  name="rooms" 
                  value={rooms}
                  readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button type="submit" style={{width:25}}><FaEdit /></button></td>
            </tr>
          </table>
        </div>

        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Currency</label></th>
            </tr>
            <tr>
              <td><input 
                  type="text"  
                  className="form-control mb-3" 
                  id="currency" 
                  placeholder="Select your currency"
                  name="currency" 
                  value={currency}
                  readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button type="submit" style={{width:25}}><FaEdit /></button></td>
            </tr>
          </table>
        </div>


        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Zip</label></th>
            </tr>
            <tr>
              <td><input 
                  type="text"  
                  className="form-control mb-3" 
                  id="zip" 
                  placeholder="Zip Code"
                  name="zip" 
                  value={zip}
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
              value={propertyArea}
              readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button type="submit" style={{width:25}}><FaEdit /></button></td>
            </tr>
          </table>
        </div>

        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Phase</label></th>
            </tr>
            <tr>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="phase" 
              placeholder="Select Phase"
              name="Phase"
              value={phase}
              readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button type="submit" style={{width:25}}><FaEdit /></button></td>
            </tr>
          </table>
        </div>


        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Floor</label></th>
            </tr>
            <tr>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="floor" 
              placeholder="Select your floor"
              name="floor"
              value={floor}
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
              value={price}
              readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button type="submit" style={{width:25}}><FaEdit /></button></td>
            </tr>
          </table>
        </div>



        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label htmlFor="address" className="form-label">Property Address</label></th>
            </tr>
            <tr>
              <td>
                <textarea 
                  className="form-control" 
                  id="address" 
                  placeholder="Enter the address of your property details"
                  name="address"
                  rows="3"
                  value={propertyAddress}
                  readOnly
                ></textarea>
              </td>
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



