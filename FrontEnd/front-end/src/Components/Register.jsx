import axios from "axios";
import '../App.css';
import {useState} from 'react';
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
  { value: 'Others', label: 'Others'}
];


const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const PWD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const PHONE_REGEX = /(^[6-9]\d{9}$)|(^[789]\d{9}$)|(^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$)/;
const ZIP_REGEX = /(^[1-9][0-9]{5}$)|((^\d{5}$)|(^\d{5}-\d{4}$))/;

function Register() {
   
    const initialErrorState = {
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
    };

    const [img,setImg] = useState([])
    const [success, setSuccess] = useState(false);
    const [formInput, setFormInput] = useState({successMsg: ""});
    const [formError, setFormError] = useState({...initialErrorState})

    
    const navigate = useNavigate();

    const handleUserInput = (name, value) => {
      setFormInput({
        ...formInput,
        [name]: value,
      });
    };

    const setImages = (images)=>{
      setImg(images);
    }

    async function submitHandler(event) {
        event.preventDefault();


          // Initialize an object to track input errors
          let inputError = {...initialErrorState};

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

          // Check if confirm password is empty
          if(!formInput.confirmPassword){
            setFormError({
              ...inputError,
              confirmPassword: "Password should not be empty",
              confirmPassword_status: "error"
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
              area: "Provide the valid measurements",
              area_status: "error"
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


          // Check if phase is empty
          if(!formInput.phase){
            setFormError({
              ...inputError,
              phase: "Please select the phase",
              phase_status: "error"
            })
            return;
          }


          // Check if phase is empty
          if(!formInput.rooms){
            setFormError({
              ...inputError,
              rooms: "Please select the phase",
              rooms_status: "error"
            })
            return;
          }

          // Clear any previous errors and show success message
          setFormError(inputError);
          setFormInput((prevState)=>({
            ...prevState,
            successMsg: "Validation Successful",
          }));



      

        try {
          await axios.post("http://localhost:8000/user/create", JSON.stringify({
          firstname: formInput.fname,
          lastname: formInput.lname,
          email: formInput.email,
          password: formInput.password,
          phone: formInput.phone,
          area: formInput.area,
          location:formInput.location,
          zip: formInput.zip,
          phase: formInput.phase,
          rooms: formInput.rooms,
          images: img
          }),
          {
            headers:{
            "Content-Type":"application/json"
            }
          });
          console.log(img)
          alert("User Registation Successful");
          setFormInput({
            fname: "",
            lname: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            area: "",
            location: "",
            zip: "",
            phase: "",
            rooms: "",
          })
          setImg('')
          setSuccess(true);
        } catch (err) {
          alert(err);
        }
      }
    
    return (
   <>   
               { success ? (
                <section>
                     {navigate('/Login')}
                </section>
            ) : (
                <section>
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
          style={{borderColor: formError.fname !== "" && formError.fname_status !== "error" ?"":"red"}}
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
            style={{borderColor: formError.lname !== "" && formError.lname_status !== "error" ?"":"red"}}
            />
          </div>
          <p className="error-message">{formError.lname}</p>



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
          style={{borderColor: formError.email !== "" && formError.email_status !== "error" ?"":"red"}}
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
          style={{borderColor: formError.password !== "" && formError.password_status !== "error" ?"":"red"}}
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
          style={{borderColor: formError.confirmPassword !== "" && formError.confirmPassword_status !== "error" ?"":"red"}}
          />
          </div>
        <p className="error-message">{formError.confirmPassword}</p>




        <div className="form-group">
          <label className="form-label">Rooms</label>
          <div className="d-flex justify-content-center mb-3">
            <select 
            className="form-select" 
            title="rooms"
            name="rooms"
            value={formInput.rooms}
            onChange={({target})=>{            
            handleUserInput(target.name, target.value)
              }}
            style={{borderColor: formError.rooms !== "" && formError.rooms_status !== "error" ?"":"red"}}  
              >
              {roomsList.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="error-message">{formError.rooms}</p>



        </div>
        <div className="col-md-2"></div>
        <div className="col-md-4">
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
          style={{borderColor: formError.phone !== "" && formError.phone_status !== "error" ?"":"red"}}
          />
        </div>
        <p className="error-message">{formError.phone}</p>


        
        <div className="form-group">
          <label className="form-label">Area</label>
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
          style={{borderColor: formError.area !== "" && formError.area_status !== "error" ?"":"red"}}
          />
        </div>
        <p className="error-message">{formError.area}</p>



        <div className="form-group">
          <label className="form-label">Location</label>
          <input 
          type="text"  
          className="form-control mb-3" 
          id="location" 
          placeholder="Property Location"
          name="location"
          value={formInput.location}
          onChange={({target})=>{            
            handleUserInput(target.name, target.value)
          }} 
          style={{borderColor: formError.location !== "" && formError.location_status !== "error" ?"":"red"}}
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
          style={{borderColor: formError.zip !== "" && formError.zip_status !== "error" ?"":"red"}}
          />
        </div>
        <p className="error-message">{formError.zip}</p>

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
            style={{borderColor: formError.phase !== "" && formError.phase_status !== "error" ?"":"red"}}  
              >
              {phaseList.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="error-message">{formError.phase}</p>

        </div>
        <div className="col-md-1"></div>
        <div className="col-sm-1"></div>
        <div className="col-sm-10">
          <div className="form-group">
            <label className="form-label">Upload Images</label>
            <ImageUpload img={img} onSetImg={setImages}/>
          </div>
        </div>
        <div className="col-sm-1"></div>
        <p align="center" className="success-message">{formInput.successMsg}</p>
        <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </div>     
      </form>
      </div>
      </div>
      <div className="col-sm-1"></div>
      </div>
      <div class="card-footer text-muted">
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

                </section>
            )}
     </>
    );
  }
  
  export default  Register;