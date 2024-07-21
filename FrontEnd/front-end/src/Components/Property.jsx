import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import '../App.css'
import ImageSlider from './ImageSlider/ImageSlider'
import { FaEdit, FaCheck } from "react-icons/fa";

const ZIP_REGEX = /(^[1-9][0-9]{5}$)|((^\d{5}$)|(^\d{5}-\d{4}$))/;

const initialState = {
  propertylocation: "",
  propertyArea: "",
  propertyType: "",
  phase: "",
  rooms: "",
  other_room: "",
  floor: "",
  currency: "",
  price: "",
  zip: "",
  propertyAddress: "",
  propertyLocation_status: "",
  propertyArea_status: "",
  propertyType_status: "",
  phase_status: "",
  rooms_status: "",
  other_room_status: "",
  floor_status: "",
  currency_status: "",
  price_status: "",
  zip_status: "",
  propertyAddress_status:""
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

const roomsList = [
  { value: '', label: 'Select Rooms'},
  { value: '1 BHK', label: '1 BHK' },
  { value: '2 BHK', label: '2 BHK' },
  { value: '3 BHK', label: '3 BHK' },
  { value: '1B + 2HK', label: '1B + 2HK'},
  { value: '1B + 3HK', label: '1B + 3HK'},
  { value: '2B + 2HK', label: '2B + 2HK'},
  { value: '2B + 3HK', label: '2B + 3HK'},
  { value: '3B + 2HK', label: '3B + 2HK'},
  { value: '3B + 3HK', label: '3B + 3HK'},
  { value: 'others', label: 'Others'}
];

const floorList = [
  { value: '', label: 'Select Floor'},
  { value: '0', label: 'Not Available'},
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
  { value: '24', label: '24' },
  { value: '25', label: '25' },
  { value: '26', label: '26' },
  { value: '27', label: '27' },
  { value: '28', label: '28' },
  { value: '29', label: '29' },
  { value: '30', label: '30' },
  { value: '31', label: '31' },
  { value: '32', label: '32' },
  { value: '33', label: '33' },
  { value: '34', label: '34' },
  { value: '35', label: '35' },
  { value: '36', label: '36' },
  { value: '37', label: '37' },
  { value: '38', label: '38' },
  { value: '39', label: '39' },
  { value: '40', label: '40' },
  { value: '41', label: '41' },
  { value: '42', label: '42' },
  { value: '43', label: '43' },
  { value: '44', label: '44' },
  { value: '45', label: '45' },
  { value: '46', label: '46' },
  { value: '47', label: '47' },
  { value: '48', label: '48' },
  { value: '49', label: '49' },
  { value: '50', label: '50' },
  { value: '51', label: '51' },
  { value: '52', label: '52' },
  { value: '53', label: '53' },
  { value: '54', label: '54' },
  { value: '55', label: '55' },
  { value: '56', label: '56' },
  { value: '57', label: '57' },
  { value: '58', label: '58' },
  { value: '59', label: '59' },
  { value: '60', label: '60' },
  { value: '61', label: '61' },
  { value: '62', label: '62' },
  { value: '63', label: '63' },
  { value: '64', label: '64' },
  { value: '65', label: '65' },
  { value: '66', label: '66' },
  { value: '67', label: '67' },
  { value: '68', label: '68' },
  { value: '69', label: '69' },
  { value: '70', label: '70' },
  { value: '71', label: '71' },
  { value: '72', label: '72' },
  { value: '73', label: '73' },
  { value: '74', label: '74' },
  { value: '75', label: '75' },
  { value: '76', label: '76' },
  { value: '77', label: '77' },
  { value: '78', label: '78' },
  { value: '79', label: '79' },
  { value: '80', label: '80' },
  { value: '81', label: '81' },
  { value: '82', label: '82' },
  { value: '83', label: '83' },
  { value: '84', label: '84' },
  { value: '85', label: '85' },
  { value: '86', label: '86' },
  { value: '87', label: '87' },
  { value: '88', label: '88' },
  { value: '89', label: '89' },
  { value: '90', label: '90' },
  { value: '91', label: '91' },
  { value: '92', label: '92' },
  { value: '93', label: '93' },
  { value: '94', label: '94' },
  { value: '95', label: '95' },
  { value: '96', label: '96' },
  { value: '97', label: '97' },
  { value: '98', label: '98' },
  { value: '99', label: '99' },
  { value: '100', label: '100' },
  { value: '101', label: '101' },
  { value: '102', label: '102' },
  { value: '103', label: '103' },
  { value: '104', label: '104' },
  { value: '105', label: '105' },
  { value: '106', label: '106' },
  { value: '107', label: '107' },
  { value: '108', label: '108' },
];

const currencyList = [
  { value: '', label: 'Select Currency'},
  { value: 'INR', label: 'INR'},
  { value: 'USD', label: 'USD'},
]

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
    const [otherOption, setOtherOption] = useState("");

    const [formError, setFormError] = useState({...initialState})
    const [showOtherOption, setShowOtherOption] = useState(false);
    const [propertyLocationtoggle,setPropertyLocationtoggle] = useState(false)
    const [propertyAreatoggle,setPropertyAreatoggle] = useState(false)
    const [propertyTypetoggle, setPropertyTypetoggle] = useState(false)
    const [phasetoggle, setPhasetoggle] = useState(false)
    const [roomstoggle, setRoomstoggle] = useState(false)
    const [floortoggle, setFloortoggle] = useState(false)
    const [currencytoggle, setCurrencytoggle] = useState(false)
    const [pricetoggle, setPricetoggle] = useState(false)
    const [ziptoggle, setZiptoggle] = useState(false)
    const [propertyAddresstoggle, setPropertyAddresstoggle] = useState(false)

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
        
    try{
      await axios.put(`http://localhost:8000/api/profile/propertylocation/${Id}`, 
        JSON.stringify({
        location: propertyLocation,
        }),
        {
          headers:{
          "Content-Type":"application/json"
          }
        });
        alert("Property Location Updated Successfully");
        setPropertyLocationtoggle(false)
      } catch (err) {
        alert(err);
      }
      setFormError(inputError);
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

          try{
            await axios.put(`http://localhost:8000/api/profile/propertyarea/${Id}`, 
              JSON.stringify({
              area: propertyArea,
              }),
              {
                headers:{
                "Content-Type":"application/json"
                }
              });
              alert("Property Area Updated Successfully");
              setPropertyAreatoggle(false)
            } catch (err) {
              alert(err);
            }
            setFormError(inputError);
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

          try{
            await axios.put(`http://localhost:8000/api/profile/propertytype/${Id}`, 
              JSON.stringify({
              property: propertyType,
              }),
              {
                headers:{
                "Content-Type":"application/json"
                }
              });
              alert("Property Type Updated Successfully");
              setPropertyTypetoggle(false)
            } catch (err) {
              alert(err);
            }
            setFormError(inputError);
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

          try{
            await axios.put(`http://localhost:8000/api/profile/propertyphase/${Id}`, 
              JSON.stringify({
              phase: phase,
              }),
              {
                headers:{
                "Content-Type":"application/json"
                }
              });
              alert("Phase Updated Successfully");
              setPhasetoggle(false)
            } catch (err) {
              alert(err);
            }         
            setFormError(inputError); 
    }




    let selected_room = {}
    if (rooms==="others"){
      selected_room = otherOption
    } else {
      selected_room = rooms
    }

    console.log(selected_room)

    
    const handleRoomsInput = (event) => {
      event.preventDefault()
      setRooms(event.target.value);
      if (event.target.value === "others") setShowOtherOption(true);
      else setShowOtherOption(false);
    };
  
    const handleRoomsEdit = (event) => {
      event.preventDefault()
      setRoomstoggle(true)
    };

    const handleRoomsSubmit = async (event) => {
      event.preventDefault()



          // Check if rooms are empty
          if(!rooms){
            setFormError({
              ...inputError,
              rooms: "Please select the rooms",
              rooms_status: "error"
            })
            return;
          }

          // Check if other option in rooms is empty
          if(rooms === "others" && !otherOption){
            setFormError({
              ...inputError,
              other_room: "Please type your choice",
              other_room_status: "error"
            })
            return;
          }


          try{
            await axios.put(`http://localhost:8000/api/profile/rooms/${Id}`, 
              JSON.stringify({
              rooms: selected_room,
              }),
              {
                headers:{
                "Content-Type":"application/json"
                }
              });
              alert("Rooms Updated Successfully");
              setRoomstoggle(false)
              window.location.reload();
            } catch (err) {
              alert(err);
            }                    
            setFormError(inputError);
    }


    const handleFloorInput = (event) => {
      event.preventDefault()
      setFloor(event.target.value);
    };
  
    const handleFloorEdit = (event) => {
      event.preventDefault()
      setFloortoggle(true)
    };

    const handleFloorsSubmit = async (event) => {
      event.preventDefault()
      // Check if floor is empty
          if(!floor){
            setFormError({
              ...inputError,
              floor: "Please select the floor",
              floor_status: "error"
            })
            return;
          }
      setFloortoggle(false)
    }


    const handleCurrencyInput = (event) => {
      event.preventDefault()
      setCurrency(event.target.value);
    };
  
    const handleCurrencyEdit = (event) => {
      event.preventDefault()
      setCurrencytoggle(true)
    };

    const handleCurrencySubmit = async (event) => {
      event.preventDefault()
          // Check if currency is empty
          if(!currency){
            setFormError({
              ...inputError,
              currency: "Please select your currency",
              currency_status: "error"
            })
            return;
          }
      setCurrencytoggle(false)
    }



    const handlePriceInput = (event) => {
      event.preventDefault()
      setPrice(event.target.value);
    };
  
    const handlePriceEdit = (event) => {
      event.preventDefault()
      setPricetoggle(true)
    };

    const handlePriceSubmit = async (event) => {
      event.preventDefault()
          // Check if price is empty
          if(!price){
            setFormError({
              ...inputError,
              price: "Price should not be empty else enter numeric zero",
              price_status: "error"
            })
            return;
          }

          // Check if price has numbers
          if(/\D/.test(price)){
            setFormError({
              ...inputError,
              price: "Provide the valid price, only the numerals",
              price_status: "error"
            })
            return;
          }
      setPricetoggle(false)
    }

    const handleZipInput = (event) => {
      event.preventDefault()
      setZip(event.target.value);
    };
  
    const handleZipEdit = (event) => {
      event.preventDefault()
      setZiptoggle(true)
    };

    const handleZipSubmit = async (event) => {
      event.preventDefault()
          // Check if zip is empty
          if(!zip){
            setFormError({
              ...inputError,
              zip: "Zip code should not be empty",
              zip_status: "error"
            })
            return;
          }
          
          const zip_pattern = ZIP_REGEX.test(zip);
          if(!zip_pattern){
            setFormError({
              ...inputError,
              zip: "Zip code is invalid",
              zip_status: "error"
            })
            return;
          }

      setZiptoggle(false)
    }


    const handlePropertyAddressInput = (event) => {
      event.preventDefault()
      setPropertyAddress(event.target.value);
    };
  
    const handlePropertyAddressEdit = (event) => {
      event.preventDefault()
      setPropertyAddresstoggle(true)
    };

    const handlePropertyAddressSubmit = async (event) => {
      event.preventDefault()
          // Check if property address is empty
          if(!propertyAddress){
            setFormError({
              ...inputError,
              propertyAddress: "Address should not be empty",
              propertyAddress_status: "error"
            })
            return;
          }  
      setPropertyAddresstoggle(false)
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
              { roomstoggle ?
              <>
              <td>
                <div className="d-flex justify-content-center mb-3">
                  <select 
                  className="form-select" 
                  title="rooms"
                  name="rooms"
                  value={rooms}
                  onChange={handleRoomsInput}
                  style={{borderColor: formError.rooms_status !== "error" ?"":"red"}}  
                    >
                    {roomsList.map((option,index) => (
                      <option value={option.value} key={index}>{option.label}</option>
                    ))}
                  </select>
                </div>

                { showOtherOption && 
                          <div className="form-group">
                          <input 
                          type="text"  
                          className="form-control mb-3" 
                          id="rooms" 
                          placeholder="Type here...."
                          name="rooms"
                          value={otherOption}
                          onChange={({target})=>{
                            setOtherOption(target.value)}
                              }
                          style={{borderColor: formError.other_room_status !== "error" ?"":"red"}}  
                          />
                          </div>
                }
                <p className="error-message">{formError.other_room}</p>
                
              </td>
              <td style={{verticalAlign: "top"}}><button onClick={handleRoomsSubmit} type="submit" style={{width:25}}><FaCheck /></button></td>
              </>
              :
              <>
              <td><input 
                  type="text"  
                  className="form-control mb-3" 
                  id="rooms" 
                  placeholder="Select Rooms"
                  name="rooms" 
                  value={rooms}
                  readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button onClick={handleRoomsEdit} type="submit" style={{width:25}}><FaEdit /></button></td>
              </>}
              </tr>
              <p className="error-message">{formError.rooms}</p>
          </table>
        </div>

        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Currency</label></th>
            </tr>
            <tr>
              { currencytoggle ?
              <>
              <td>
              <div className="d-flex justify-content-center mb-3">
                <select 
                className="form-select" 
                title="currency"
                name="currency"
                value={currency}
                onChange={handleCurrencyInput}
                style={{borderColor: formError.currency_status !== "error" ?"":"red"}}  
                  >
                  {currencyList.map((option, index) => (
                    <option value={option.value} key={index}>{option.label}</option>
                  ))}
                </select>
              </div>
              </td>
              <td style={{verticalAlign: "top"}}><button onClick={handleCurrencySubmit} type="submit" style={{width:25}}><FaCheck /></button></td>
              </>
              :
              <>
              <td><input 
                  type="text"  
                  className="form-control mb-3" 
                  id="currency" 
                  placeholder="Select your currency"
                  name="currency" 
                  value={currency}
                  readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button onClick={handleCurrencyEdit} type="submit" style={{width:25}}><FaEdit /></button></td>
              </>
              }
              </tr>
              <p className="error-message">{formError.currency}</p>
          </table>
        </div>


        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Zip</label></th>
            </tr>
            <tr>
              { ziptoggle ?
            <>
            <td><input 
                type="text"  
                className="form-control mb-3" 
                id="zip" 
                placeholder="Zip Code"
                name="zip" 
                value={zip}
                onChange={handleZipInput}
                style={{borderColor: formError.zip_status !== "error" ?"":"red"}}  
            /></td>
            <td style={{verticalAlign: "top"}}><button onClick={handleZipSubmit} type="submit" style={{width:25}}><FaCheck /></button></td>
            </> 
            :
            <>
              <td><input 
                  type="text"  
                  className="form-control mb-3" 
                  id="zip" 
                  placeholder="Zip Code"
                  name="zip" 
                  value={zip}
                  readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button onClick={handleZipEdit} type="submit" style={{width:25}}><FaEdit /></button></td>
              </>  
              }
            </tr>
            <p className="error-message">{formError.zip}</p>
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
              { floortoggle ?
              <>
              <td>
                <div className="d-flex justify-content-center mb-3">
                  <select 
                  className="form-select" 
                  title="floor"
                  name="floor"
                  value={floor}
                  onChange={handleFloorInput}
                  style={{borderColor: formError.floor_status !== "error" ?"":"red"}}  
                    >
                    {floorList.map((option, index) => (
                      <option value={option.value} key={index}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </td>
              <td style={{verticalAlign: "top"}}><button onClick={handleFloorsSubmit} type="submit" style={{width:25}}><FaCheck /></button></td>
              </>
              :
              <>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="floor" 
              placeholder="Select your floor"
              name="floor"
              value={floor}
              readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button onClick={handleFloorEdit} type="submit" style={{width:25}}><FaEdit /></button></td>
              </>
              }
              </tr>
              <p className="error-message">{formError.floor}</p>
          </table>
        </div>



        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label className="form-label">Price</label></th>
            </tr>
            <tr>
              {pricetoggle?<>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="price" 
              placeholder="Estimated Price"
              name="price"
              value={price}
              onChange={handlePriceInput}
              style={{borderColor: formError.price_status !== "error" ?"":"red"}}  
              /></td>
              <td style={{verticalAlign: "top"}}><button onClick={handlePriceSubmit} type="submit" style={{width:25}}><FaCheck /></button></td>
              </>:<>
              <td><input 
              type="text"  
              className="form-control mb-3" 
              id="price" 
              placeholder="Estimated Price"
              name="price"
              value={price}
              readOnly
              /></td>
              <td style={{verticalAlign: "top"}}><button onClick={handlePriceEdit} type="submit" style={{width:25}}><FaEdit /></button></td>
              </>
              }
              </tr>
              <p className="error-message">{formError.price}</p>
          </table>
        </div>



        <div className="form-group">
          <table align='center'>
            <tr>
              <th><label htmlFor="address" className="form-label">Property Address</label></th>
            </tr>
            <tr>{ propertyAddresstoggle?
            <>
            <td>
              <textarea 
                className="form-control" 
                id="address" 
                placeholder="Enter the address of your property details"
                name="address"
                rows="3"
                value={propertyAddress}
                onChange={handlePropertyAddressInput}
                style={{borderColor: formError.propertyAddress_status !== "error" ?"":"red"}}  
              ></textarea>
            </td>
            <td style={{verticalAlign: "top"}}><button onClick={handlePropertyAddressSubmit} type="submit" style={{width:25}}><FaCheck /></button></td>
            </>
              :<>
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
              <td style={{verticalAlign: "top"}}><button onClick={handlePropertyAddressEdit} type="submit" style={{width:25}}><FaEdit /></button></td>
              </>
              }
              </tr>
              <p className="error-message">{formError.propertyAddress}</p>
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



