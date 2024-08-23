import {useState, useEffect, useCallback} from 'react';
import '../App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {properties} from '../properties.js'

const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const PHONE_REGEX = /(^[6-9]\d{9}$)|(^[789]\d{9}$)|(^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$)/;

function ContactUs(props) {

  const initialState = {
    fname:"",
    lname:"",
    email:"",
    phone:"",
    comments:"",
    fname_status: "",
    lname_status: "", 
    email_status: "",
    phone_status: ""
  }


    const [loggedIn, setLoggedIn] = useState(false)
    const [formInput, setFormInput] = useState({...initialState,successMsg: ""});
    const [formError, setFormError] = useState({...initialState})
    const navigate = useNavigate();

    const handleUserInput = (name, value) => {
      setFormInput({
        ...formInput,
        [name]: value,
      });
    };

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

          // Clear any previous errors and show success message
          setFormError(inputError);
          setFormInput((prevState)=>({
            ...prevState,
            successMsg: "Verification Successful, Saving the details",
          }));


          try {
            await axios.post(properties.REACT_APP_SERVER_URI+'/api/contacts/create', JSON.stringify({
            firstname: formInput.fname,
            lastname: formInput.lname,
            email: formInput.email,
            phone: formInput.phone,
            comments: formInput.comments,
            requests: true
            }),
            {
              headers:{
              "Content-Type":"application/json"
              }
            });
            alert("Your request was sent Successfully");
            setFormInput({
              fname: "",
              lname: "",
              email: "",
              phone: "",
              comments: ""
            })
            navigate('/');
          } catch (err) {
            alert(err);
          }

    }

    const session = useCallback(async ()=>{
      await axios.get(properties.REACT_APP_SERVER_URI+'/api/session')
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

    axios.defaults.withCredentials = true;
    useEffect(()=>{
      session();
    },[session])

    return(
      <div className="container">
      <div className="row">
      <div className="col-md-1"></div>
          <div className="col-md-10">
          <div className="card form-container mt-4">
              <h1 className="card-header">
                  <center>
                    <div className="header-font">Contact Us</div>
                  </center>
              </h1>
              <div className="card-body" align="center">
              

              <form onSubmit={submitHandler}>
                <div className='row form-container mt-4'>
                  <div className='mt-2'></div>
                  <div className='col-md-1'></div>
                  <div className='col-md-4'>
                      <div className="form-group" align="left">
                          <label className="form-label">First Name</label>
                          <input 
                            type="text"  
                            className="form-control mb-3" 
                            id="fname" 
                            placeholder="Your First Name"
                            name="fname"
                            value={formInput.fname}
                            onChange={({target})=>{
                              handleUserInput(target.name, target.value)
                            }}
                            style={{borderColor: formError.fname_status !== "error" ?"":"red"}}
                            />
                      </div>
                      <p className="error-message">{formError.fname}</p>


                      <div className="form-group" align="left">
                        <label className="form-label">Last Name</label>
                        <input 
                            type="text"  
                            className="form-control mb-3" 
                            id="lname" 
                            placeholder="Your Last Name"
                            name="lname"
                            onChange={({target})=>{
                              handleUserInput(target.name, target.value)
                            }}
                            style={{borderColor: formError.lname_status !== "error" ?"":"red"}}
                            />
                          </div>
                          <p className="error-message">{formError.lname}</p>

                      
                  </div>
                  <div className='col-md-2'></div>
                  <div className='col-md-4'>
                  <div className="form-group" align="left">
                          <label className="form-label">Email</label>
                          <input 
                            type="email"  
                            className="form-control mb-3" 
                            id="email" 
                            placeholder="Your Email"
                            name="email"
                            value={formInput.email}
                            onChange={({target})=>{
                              handleUserInput(target.name, target.value)
                            }}
                            style={{borderColor: formError.email_status !== "error" ?"":"red"}}
                            />
                    </div>
                    <p className="error-message">{formError.email}</p>


                      <div className="form-group" align="left">
                          <label className="form-label">Phone</label>
                          <input 
                            type="text"  
                            className="form-control mb-3" 
                            id="phone" 
                            placeholder="Your Phone"
                            name="phone"
                            value={formInput.phone}
                            onChange={({target})=>{            
                              handleUserInput(target.name, target.value)
                            }} 
                            style={{borderColor: formError.phone_status !== "error" ?"":"red"}}
                            />
                          </div>
                          <p className="error-message">{formError.phone}</p>
                          
                  </div>
                  <div className='col-md-1'></div>
              
                  <div className='col-md-1'></div>
                  <div className='col-md-10'>
                  <div className="form-group">
                    <div className="mb-3" align="left">
                      <label htmlFor="comments" className="form-label">Comments</label>
                      <textarea 
                      className="form-control" 
                      id="comments" 
                      name="comments"
                      rows="3"
                      onChange={({target})=>{            
                        handleUserInput(target.name, target.value)
                      }} 
                      ></textarea>
                    </div>
                    </div>
                    </div>
                    <div className='col-md-1'></div>
                    <div className='mt-2'></div>


                </div>
                <p align="center" className="success-message mt-4">{formInput.successMsg}</p>

                <button type="submit" className="btn btn-primary mb-4">send</button>
                </form>
              </div>
          </div>
        </div>
      <div className="col-md-1"></div>
  </div>
  </div>
    )
}

export default ContactUs;