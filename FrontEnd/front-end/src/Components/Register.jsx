import axios from "axios";
import '../App.css';
import { useState, useEffect, useCallback } from 'react';
import ImageUpload from './ImageUpload/ImageUpload';
import { useNavigate } from 'react-router-dom';

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

const propertyList = [
  { value: '', label: 'Select Property Type'},
  { value: 'Open Plot', label: 'Open Plot'},
  { value: 'Independent House', label: 'Independent House'},
  { value: 'Duplex Home', label: 'Duplex Home'},
  { value: 'Flat', label: 'Flat'},
  { value: 'Commercial', label: 'Commerial'},
]

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const PWD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const PHONE_REGEX = /(^[6-9]\d{9}$)|(^[789]\d{9}$)|(^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$)/;
const ZIP_REGEX = /(^[1-9][0-9]{5}$)|((^\d{5}$)|(^\d{5}-\d{4}$))/;

function Register(props) {
   
    const initialState = {
      fname:"",
      lname:"",
      user:"",
      email:"",
      password:"",
      confirmPassword:"",
      phone:"",
      area:"",
      location:"",
      zip:"",
      phase:"",
      rooms:"",
      other_room:"",
      property: "",
      floor:"",
      currency:"",
      price: "",
      address: "",
      user_status: "",
      fname_status: "",
      lname_status: "", 
      email_status: "",
      password_status: "",
      confirmPassword_status: "",
      phone_status: "",
      area_status: "",
      location_status: "",
      zip_status: "",
      phase_status: "",
      rooms_status: "",
      other_room_status: "",
      property_status: "",
      floor_status: "",
      currency_status:"",
      price_status: "",
      address_status: ""
    };

    const [loggedIn, setLoggedIn] = useState(false)
    const [img,setImg] = useState([])
    const [formInput, setFormInput] = useState({...initialState,successMsg: ""});
    const [formError, setFormError] = useState({...initialState})
    const [showOtherOption, setShowOtherOption] = useState(false);
    const [otherOption, setOtherOption] = useState("");
    const [roomSelect, setRoomSelect] = useState({...initialState,successMsg: ""});
    const [loading,setLoading] = useState(false);
    const [usernames, setUsernames] = useState([]);

    const navigate = useNavigate();
    
    const handleUserInput = (name, value) => {
      setFormInput({
        ...formInput,
        [name]: value,
      });
    };


    const handleRoomSelect = (name, value) => {
      setRoomSelect({
        ...roomSelect,
        [name]: value,
      });
      if (value === "others") setShowOtherOption(true);
        else setShowOtherOption(false);
    };

    let selected_room = {}
    if (roomSelect.rooms==="others"){
      selected_room = otherOption
    } else {
      selected_room = roomSelect.rooms
    }

    const setImages = (images)=>{
      setImg(images);
    }

    
    const session = useCallback(async ()=>{
      await axios.get('http://localhost:8000/api/session')
      .then(res => {
        if(res.data.valid){
          setLoggedIn(res.data.isLoggedIn);
          props.LoginStatus(loggedIn);
        } else {
          props.LoginStatus(!loggedIn);
        }
      })
      .catch(err => console.log(err))
    },[props, loggedIn])


    const users = useCallback(async ()=>{
      await axios.get('http://localhost:8000/api/users')
      .then(res => {
        if(res.data.status){
          const doc_users = res.data.users          
          let users_list = []
          for (let i = 0; i < doc_users.data.length; i++) {
             users_list.push(doc_users.data[i].username)
          }
          setUsernames(users_list)
        }     
      })
      .catch(err => console.log(err))
    },[])
    

    axios.defaults.withCredentials = true;
    useEffect(()=>{
      session();
      users();
    },[session, users])

    async function submitHandler(event) {
        event.preventDefault();


          // Initialize an object to track input errors
          let inputError = {...initialState};

          // Check if first name is empty
          if(!formInput.fname){
            setFormError({
              ...inputError,
              fname: "First name should not be empty",
              fname_status: "error"
            })
            return;
          }

          // Check if last name is empty
          if(!formInput.lname){
            setFormError({
              ...inputError,
              lname: "Last name should not be empty",
              lname_status: "error"
            })
            return;
          }


          // Check if user is empty
          if(!formInput.user){
            setFormError({
              ...inputError,
              user: "Username should not be empty",
              user_status: "error"
            })
            return;
          }

          const user_pattern = USER_REGEX.test(formInput.user);
          if (!user_pattern) {
              setFormError({
                ...inputError,
                user: "Can have 4 to 24 characters. Must begin with a letter. Numbers, letters, underscores, and hyphens are allowed",
                user_status: "error"
              });
              return;
          }

          // Check if user already exists
            for (let i = 0; i < usernames.length; i++) {
                if(formInput.user === usernames[i]){
                    setFormError({
                      ...inputError,
                      user: "Username already exists, please provide another",
                      user_status: "error"
                    })
                  return;
                }
            }


          // Check if email is empty
          if(!formInput.email){
            setFormError({
              ...inputError,
              email: "Email should not be empty",
              email_status: "error"
            })
            return;
          }


          const email_pattern = EMAIL_REGEX.test(formInput.email);
          if (!email_pattern) {
              setFormError({
                ...inputError,
                email: "Email format is incorrect",
                email_status: "error"
              });
              return;
          }

          // Check if password is empty
          if(!formInput.password){
            setFormError({
              ...inputError,
              password: "Password should not be empty",
              password_status: "error"
            })
            return;
          }


          const password_pattern = PWD_REGEX.test(formInput.password);
          if (!password_pattern) {
              setFormError({
                ...inputError,
                password: "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters",
                password_status: "error"
              });
              return;
          }

          // Check if confirm password is empty
          if(!formInput.confirmPassword){
            setFormError({
              ...inputError,
              confirmPassword: "Password should not be empty",
              confirmPassword_status: "error"
            })
            return;
          }



          // Check if password and confirm password match
          if (formInput.confirmPassword !== formInput.password){
            setFormError({
              ...inputError,
              confirmPassword: "Password and Confirm password should be the same",
              confirmPassword_status: "error"
            });
            return;
          } 


          // Check if phone is empty
          if(!formInput.phone){
            setFormError({
              ...inputError,
              phone: "Phone number should not be empty",
              phone_status: "error"
            })
            return;
          }

          const phone_pattern = PHONE_REGEX.test(formInput.phone);
          if (!phone_pattern){
            setFormError({
              ...inputError,
              phone: "Invalid phone number",
              phone_status: "error"
            })
            return;
          }
          

          // Check if property type is empty
          if(!formInput.property){
            setFormError({
              ...inputError,
              property: "Please select your type of property",
              property_status: "error"
            })
            return;
          }          



          // Check if rooms are empty
          if(!roomSelect.rooms){
            setFormError({
              ...inputError,
              rooms: "Please select the rooms",
              rooms_status: "error"
            })
            return;
          }


          // Check if other option in rooms is empty
          if(roomSelect.rooms === "others" && !otherOption){
            setFormError({
              ...inputError,
              other_room: "Please type your choice",
              other_room_status: "error"
            })
            return;
          }


          // Check if area is empty
          if(!formInput.area){
            setFormError({
              ...inputError,
              area: "Area should not be empty else enter numeric zero",
              area_status: "error"
            })
            return;
          }

          // Check if area has numbers
          if(/\D/.test(formInput.area)){
            setFormError({
              ...inputError,
              area: "Provide the valid measurements, only the numerals",
              area_status: "error"
            })
            return;
          }




          // Check if phase is empty
          if(!formInput.phase){
            setFormError({
              ...inputError,
              phase: "Please select the phase",
              phase_status: "error"
            })
            return;
          }



          // Check if floor is empty
          if(!formInput.floor){
            setFormError({
              ...inputError,
              floor: "Please select the floor",
              floor_status: "error"
            })
            return;
          }

          
          // Check if currency is empty
          if(!formInput.currency){
            setFormError({
              ...inputError,
              currency: "Please select your currency",
              currency_status: "error"
            })
            return;
          }




          // Check if price is empty
          if(!formInput.price){
            setFormError({
              ...inputError,
              price: "Price should not be empty else enter numeric zero",
              price_status: "error"
            })
            return;
          }

          // Check if price has numbers
          if(/\D/.test(formInput.price)){
            setFormError({
              ...inputError,
              price: "Provide the valid price, only the numerals",
              price_status: "error"
            })
            return;
          }

          


          // Check if location is empty
          if(!formInput.location){
            setFormError({
              ...inputError,
              location: "Location should not be empty",
              location_status: "error"
            })
            return;
          }

          // Check if zip is empty
          if(!formInput.zip){
            setFormError({
              ...inputError,
              zip: "Zip code should not be empty",
              zip_status: "error"
            })
            return;
          }
          
          const zip_pattern = ZIP_REGEX.test(formInput.zip);
          if(!zip_pattern){
            setFormError({
              ...inputError,
              zip: "Zip code is invalid",
              zip_status: "error"
            })
            return;
          }

          

          // Check if property address is empty
          if(!formInput.address){
            setFormError({
              ...inputError,
              address: "Address should not be empty",
              address_status: "error"
            })
            return;
          }          

          // Clear any previous errors and show success message
          setFormError(inputError);
          setFormInput((prevState)=>({
            ...prevState,
            successMsg: "Verification Successful, Saving the details",
          }));
        
        var pid = Math.floor(1000000000 + Math.random() * 9000000000);
        try {
          setLoading(true);
          await axios.post("http://localhost:8000/api/create", JSON.stringify({
          firstname: formInput.fname,
          lastname: formInput.lname,
          username: formInput.user,
          email: formInput.email,
          password: formInput.password,
          phone: formInput.phone,
          area: formInput.area,
          location:formInput.location,
          zip: formInput.zip,
          phase: formInput.phase,
          rooms: selected_room,
          floor: formInput.floor,
          currency: formInput.currency,
          property: formInput.property,
          price: formInput.price,
          address: formInput.address,
          images: img,
          requests: "Approved",
          propertyid: pid
          }),
          {
            headers:{
            "Content-Type":"application/json"
            }
          });
          alert("User Registation Successful");
          setFormInput({
            fname: "",
            lname: "",
            user: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            area: "",
            location: "",
            zip: "",
            phase: "",
            rooms: "",
            floor: "",
            currency: "",
            property: "",
            price: "",
            address: "",
          })
          setLoading(false);
          setRoomSelect('')
          setImg('')
          setUsernames('')
          navigate('/Login');
        } catch (err) {
          alert(err);
        }
      }
    
    return (
   <>   

     <div>
        <div className="container mt-4" >
    <div className="card">
    <h1 className="card-header"><center><div className="header-font">Proprietor's Registration</div></center></h1>
    <div className="row">
		  <div className="col-sm-1"></div>
			<div className="col-sm-10 form-container">
        <div className="card-body">
    <form onSubmit={submitHandler}>
      <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-4">


        <div className="form-group">
          <label className="form-label">First name</label>
          <input 
          type="text"  
          className="form-control mb-3" 
          id="fname" 
          placeholder="First Name"
          name="fname"
          value={formInput.fname}
          onChange={({target})=>{
            handleUserInput(target.name, target.value)
          }}
          style={{borderColor: formError.fname_status !== "error" ?"":"red"}}
          />
        </div>
        <p className="error-message">{formError.fname}</p>



        <div className="form-group">
            <label className="form-label">Last name</label>
            <input 
            type="text"  
            className="form-control mb-3" 
            id="lname" 
            placeholder="Last Name"
            name="lname"
            value={formInput.lname}
            onChange={({target})=>{
              handleUserInput(target.name, target.value)
            }}
            style={{borderColor: formError.lname_status !== "error" ?"":"red"}}
            />
          </div>
          <p className="error-message">{formError.lname}</p>



          <div className="form-group">
          <label className="form-label">User name</label>
          <input 
          type="text"  
          className="form-control mb-3" 
          id="user" 
          placeholder="Provide User Name of your choice"
          name="user"
          value={formInput.user}
          onChange={({target})=>{
            handleUserInput(target.name, target.value)
          }}
          style={{borderColor: formError.user_status !== "error" ?"":"red"}}
          />
        </div>
        <p className="error-message">{formError.user}</p>


          <div className="form-group">
          <label className="form-label">email</label>
          <input 
          type="email"  
          className="form-control mb-3" 
          id="email" 
          placeholder="Email"
          name="email"
          value={formInput.email}
          onChange={({target})=>{
            handleUserInput(target.name, target.value)
          }}
          style={{borderColor: formError.email_status !== "error" ?"":"red"}}
          />
          </div>
        <p className="error-message">{formError.email}</p>





        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
          type="password"  
          className="form-control mb-3" 
          id="password" 
          placeholder="Password"
          name="password"
          value={formInput.password}
          onChange={({target})=>{
            handleUserInput(target.name, target.value)
          }}
          style={{borderColor: formError.password_status !== "error" ?"":"red"}}
          />
          </div>
        <p className="error-message">{formError.password}</p>




        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input 
          type="password"  
          className="form-control mb-3" 
          id="confirmPassword" 
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formInput.confirmPassword}
          onChange={({target})=>{            
            handleUserInput(target.name, target.value)
          }}  
          style={{borderColor: formError.confirmPassword_status !== "error" ?"":"red"}}
          />
          </div>
        <p className="error-message">{formError.confirmPassword}</p>




        <div className="form-group">
          <label className="form-label">Phone</label>
          <input 
          type="text"  
          className="form-control mb-3" 
          id="phone" 
          placeholder="Phone"
          name="phone"
          value={formInput.phone}
          onChange={({target})=>{            
            handleUserInput(target.name, target.value)
          }} 
          style={{borderColor: formError.phone_status !== "error" ?"":"red"}}
          />
        </div>
        <p className="error-message">{formError.phone}</p>





        <div className="form-group">
          <label className="form-label">Type of Property</label>
          <div className="d-flex justify-content-center mb-3">
            <select 
            className="form-select" 
            title="property"
            name="property"
            value={formInput.property}
            onChange={({target})=>{            
            handleUserInput(target.name, target.value)
              }}
            style={{borderColor: formError.property_status !== "error" ?"":"red"}}  
              >
              {propertyList.map((option,index) => (
                <option value={option.value} key={index}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="error-message">{formError.property}</p>




        <div className="form-group">
          <label className="form-label">Rooms</label>
          <div className="d-flex justify-content-center mb-3">
            <select 
            className="form-select" 
            title="rooms"
            name="rooms"
            value={roomSelect.rooms}
            onChange={({target})=>{            
            handleRoomSelect(target.name, target.value)
              }}
            style={{borderColor: formError.rooms_status !== "error" ?"":"red"}}  
              >
              {roomsList.map((option,index) => (
                <option value={option.value} key={index}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="error-message">{formError.rooms}</p>
        


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




        </div>
        <div className="col-md-2"></div>
        <div className="col-md-4">




        <div className="form-group">
          <label className="form-label">Area of Property</label>
          <input 
          type="text"  
          className="form-control mb-3" 
          id="area" 
          placeholder="Area in Sq.Feet"
          name="area"
          value={formInput.area}
          onChange={({target})=>{            
            handleUserInput(target.name, target.value)
          }} 
          style={{borderColor: formError.area_status !== "error" ?"":"red"}}
          />
        </div>
        <p className="error-message">{formError.area}</p>






        <div className="form-group">
          <label className="form-label">Phase</label>
          <div className="d-flex justify-content-center mb-3">
            <select 
            className="form-select" 
            title="phase"
            name="phase"
            value={formInput.phase}
            onChange={({target})=>{            
            handleUserInput(target.name, target.value)
              }}
            style={{borderColor: formError.phase_status !== "error" ?"":"red"}}  
              >
              {phaseList.map((option,index) => (
                <option value={option.value} key={index}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="error-message">{formError.phase}</p>




        <div className="form-group">
          <label className="form-label">Floor</label>
          <div className="d-flex justify-content-center mb-3">
            <select 
            className="form-select" 
            title="floor"
            name="floor"
            value={formInput.floor}
            onChange={({target})=>{            
            handleUserInput(target.name, target.value)
              }}
            style={{borderColor: formError.floor_status !== "error" ?"":"red"}}  
              >
              {floorList.map((option, index) => (
                <option value={option.value} key={index}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="error-message">{formError.floor}</p>




        <div className="form-group">
          <label className="form-label">Currency</label>
          <div className="d-flex justify-content-center mb-3">
            <select 
            className="form-select" 
            title="currency"
            name="currency"
            value={formInput.currency}
            onChange={({target})=>{            
            handleUserInput(target.name, target.value)
              }}
            style={{borderColor: formError.currency_status !== "error" ?"":"red"}}  
              >
              {currencyList.map((option, index) => (
                <option value={option.value} key={index}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="error-message">{formError.currency}</p>




        
        <div className="form-group">
          <label className="form-label">Price</label>
          <input 
          type="text"  
          className="form-control mb-3" 
          id="price" 
          placeholder="Estimated Price"
          name="price"
          value={formInput.price}
          onChange={({target})=>{            
            handleUserInput(target.name, target.value)
          }} 
          style={{borderColor: formError.price_status !== "error" ?"":"red"}}
          />
        </div>
        <p className="error-message">{formError.price}</p>





        <div className="form-group">
          <label className="form-label">Property Location</label>
          <input 
          type="text"  
          className="form-control mb-3" 
          id="location" 
          placeholder="Enter your Property Location"
          name="location"
          value={formInput.location}
          onChange={({target})=>{            
            handleUserInput(target.name, target.value)
          }} 
          style={{borderColor: formError.location_status !== "error" ?"":"red"}}
          />
        </div>
        <p className="error-message">{formError.location}</p>



        <div className="form-group">
          <label className="form-label">Zip</label>
          <input 
          type="text"  
          className="form-control mb-3" 
          id="zip" 
          placeholder="Zip Code"
          name="zip"
          value={formInput.zip}
          onChange={({target})=>{            
            handleUserInput(target.name, target.value)
          }} 
          style={{borderColor: formError.zip_status !== "error" ?"":"red"}}
          />
        </div>
        <p className="error-message">{formError.zip}</p>



        <div className="form-group">
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Property Address</label>
          <textarea 
          className="form-control" 
          id="address" 
          placeholder="Enter the address of your property details"
          name="address"
          rows="5"
          onChange={({target})=>{            
            handleUserInput(target.name, target.value)
          }} 
          style={{borderColor: formError.address_status !== "error" ?"":"red"}}
          ></textarea>
        </div>
        </div>
        <p className="error-message">{formError.address}</p>








        </div>
        <div className="col-md-1"></div>
        <div className="col-sm-1"></div>
        <div className="col-sm-10">
          <div className="form-group" align="center">
            <label className="form-label">Upload Images</label>
            <ImageUpload img={img} onSetImg={setImages}/>
          </div>
        </div>
        <div className="col-sm-1"></div>
        
        <p align="center" className="success-message mt-4">{formInput.successMsg}</p>
        <div align="center">
          {!loading && <button type="submit" className="btn btn-primary mt-4">Submit</button>}
        </div>
        </div>     
        <div align="center">
          {loading && <img src={require("./loading.gif")} width="50" height="50" alt="...Loading"/>}
        </div>
      </form>
      </div>
      </div>
      <div className="col-sm-1"></div>
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

     </>
    );
  }
  
  export default  Register;