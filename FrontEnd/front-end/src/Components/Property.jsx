import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import '../App.css'
import ImageSlider from './ImageSlider/ImageSlider'
import { FaEdit, FaCheck } from "react-icons/fa";


const initialState = {
  propertylocation: "",
  propertyArea: "",
  propertyType: "",
  phase: "",
  propertyLocation_status: "",
  propertyArea_status: "",
  propertyType_status: "",
  phase_status: ""
}

const propertyList = [
  { value: '', label: 'Select Property Type'},
  { value: 'Open Plot', label: 'Open Plot'},
  { value: 'Independent House', label: 'Independent House'},
  { value: 'Duplex Home', label: 'Duplex Home'},
  { value: 'Flat', label: 'Flat'},
  { value: 'Commercial', label: 'Commerial'},
]

const phaseList = [
  { value: '', label: 'Select Phase'},
  { value: 'east', label: 'East' },
  { value: 'west', label: 'West' },
  { value: 'north', label: 'North' },
  { value: 'south', label: 'South' }
];

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
    const [propertyLocationtoggle,setPropertyLocationtoggle] = useState(false)
    const [propertyAreatoggle,setPropertyAreatoggle] = useState(false)
    const [propertyTypetoggle, setPropertyTypetoggle] = useState(false)
    const [phasetoggle, setPhasetoggle] = useState(false)

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
      setPropertyLocationtoggle(true)
    };

    const handlePropertyLocationSubmit = async (event) => {
      event.preventDefault()

          // Check if property location is empty
          if(!propertyLocation){
            setFormError({
              ...inputError,
              propertyLocation: "Property Location should not be empty",
              propertyLocation_status: "error"
            })
            return;
          }

      setPropertyLocationtoggle(false)
    }




    const handlePropertyAreaInput = (event) => {
      event.preventDefault()
      setPropertyArea(event.target.value);
    };
  
    const handlePropertyAreaEdit = (event) => {
      event.preventDefault()
      setPropertyAreatoggle(true)
    };

    const handlePropertyAreaSubmit = async (event) => {
      event.preventDefault()

          // Check if property area is empty
          if(!propertyArea){
            setFormError({
              ...inputError,
              propertyArea: "Area should not be empty else enter numeric zero",
              propertyArea_status: "error"
            })
            return;
          }

          // Check if property area has numbers
          if(/\D/.test(propertyArea)){
            setFormError({
              ...inputError,
              propertyArea: "Provide the valid measurements, only the numerals",
              propertyArea_status: "error"
            })
            return;
          }

      setPropertyAreatoggle(false)
    }



    const handlePropertyTypeInput = (event) => {
      event.preventDefault()
      setPropertyType(event.target.value);
    };
  
    const handlePropertyTypeEdit = (event) => {
      event.preventDefault()
      setPropertyTypetoggle(true)
    };

    const handlePropertyTypeSubmit = async (event) => {
      event.preventDefault()

          // Check if property type is empty
          if(!propertyType){
            setFormError({
              ...inputError,
              propertyType: "Please select your type of property",
              propertyType_status: "error"
            })
            return;
          }   
      
      setPropertyTypetoggle(false)
    }


    const handlePhaseInput = (event) => {
      event.preventDefault()
      setPhase(event.target.value);
    };
  
    const handlePhaseEdit = (event) => {
      event.preventDefault()
      setPhasetoggle(true)
    };
    
    const handlePhaseSubmit = async (event) => {
      event.preventDefault()

          // Check if phase is empty
          if(!phase){
            setFormError({
              ...inputError,
              phase: "Please select the phase",
              phase_status: "error"
            })
            return;
          } 
      
      setPhasetoggle(false)
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
              { propertyTypetoggle ?
              <>
              <td>
              <div className="d-flex justify-content-center mb-3">
                <select 
                className="form-select" 
                title="property"
                name="property"
                value={propertyType}
                onChange={handlePropertyTypeInput}
                style={{borderColor: formError.propertyType_status !== "error" ?"":"red"}}  
                  >
                  {propertyList.map((option,index) => (
                    <option value={option.value} key={index}>{option.label}</option>
                  ))}
                </select>
              </div>
              </td>
              <td style={{verticalAlign: "top"}}><button onClick={handlePropertyTypeSubmit} type="submit" style={{width:25}}><FaCheck /></button></td>
              </>
              :
              <>
              <td><input 
                  type="text"  
                  className="form-control mb-3" 
                  id="property" 
                  placeholder="Select your Property type"
                  name="property"
                  value={propertyType} 
                  readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button onClick={handlePropertyTypeEdit} type="submit" style={{width:25}}><FaEdit /></button></td>
              </>
              }
              </tr>
              <p className="error-message">{formError.propertyType}</p>
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
              {propertyAreatoggle?
              <>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="area" 
              placeholder="Area in Sq.Feet"
              name="area"
              value={propertyArea}
              onChange={handlePropertyAreaInput}
              style={{borderColor: formError.propertyArea_status !== "error" ?"":"red"}}
              /></td>
              <td style={{verticalAlign: "top"}}><button onClick={handlePropertyAreaSubmit} type="submit" style={{width:25}}><FaCheck /></button></td>
              </>
              :<>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="area" 
              placeholder="Area in Sq.Feet"
              name="area"
              value={propertyArea}
              readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button onClick={handlePropertyAreaEdit} type="submit" style={{width:25}}><FaEdit /></button></td>
              </>}
            </tr>
            <p className="error-message">{formError.propertyArea}</p>
          </table>
        </div>

        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Phase</label></th>
            </tr>
            <tr>
              { phasetoggle?
              <>
              <td><div className="d-flex justify-content-center mb-3">
                  <select 
                  className="form-select" 
                  title="phase"
                  name="phase"
                  value={phase}
                  onChange={handlePhaseInput}
                  style={{borderColor: formError.phase_status !== "error" ?"":"red"}}  
                    >
                    {phaseList.map((option,index) => (
                      <option value={option.value} key={index}>{option.label}</option>
                    ))}
                  </select>
                  </div>
              </td>
              <td style={{verticalAlign: "top"}}><button onClick={handlePhaseSubmit} type="submit" style={{width:25}}><FaCheck /></button></td>
              </>:
              <>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="phase" 
              placeholder="Select Phase"
              name="Phase"
              value={phase}
              readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button onClick={handlePhaseEdit} type="submit" style={{width:25}}><FaEdit /></button></td>
              </>}
            </tr>
            <p className="error-message">{formError.phase}</p>
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



