import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./Sidebar/AdminSidebar";

const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const PHONE_REGEX = /(^[6-9]\d{9}$)|(^[789]\d{9}$)|(^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$)/;

function AddNewContact(props) {

    const initialState = {
        fname:"",
        lname:"",
        email:"",
        phone:"",
        fname_status: "",
        lname_status: "", 
        email_status: "",
        password_status: "",
    }

    const [formInput, setFormInput] = useState({...initialState,successMsg: ""});
    const [formError, setFormError] = useState({...initialState})
    const [loggedIn, setLoggedIn] = useState(false)

    const navigate = useNavigate()

    const handleUserInput = (name, value) => {
        setFormInput({
          ...formInput,
          [name]: value,
        });
      };

    
    const session = useCallback(async () =>{
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/session`)
        .then(res => {
          if(res.data.valid){
            setLoggedIn(res.data.isLoggedIn);
            props.LoginStatus(loggedIn);
          } else {
            props.LoginStatus(!loggedIn);
            navigate('/Login')
          }
        })
        .catch(err => console.log(err))
      },[props, loggedIn, navigate])

      axios.defaults.withCredentials = true;
      useEffect(()=>{
        session();
      },[session])

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
            await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/contacts/create`, JSON.stringify({
            firstname: formInput.fname,
            lastname: formInput.lname,
            email: formInput.email,
            phone: formInput.phone,
            requests: false
            }),
            {
              headers:{
              "Content-Type":"application/json"
              }
            });
            alert("Contact Saved Successfully");
            setFormInput({
              fname: "",
              lname: "",
              email: "",
              phone: "",
            })
            navigate('/');
          } catch (err) {
            alert(err);
          }

      }

    return(
        <React.Fragment>
        <div className="row">
        <div className="col-md-2">        
          <AdminSidebar/>
        </div>
        <div className="col-md-10" style={{paddingLeft: 30}}>
      
      
        <div className="container mt-4" >
          <div className="card">
          <h1 className="card-header">
            <center>
              <div className="header-font">Add New Contact</div>
            </center>
          </h1>
            <div className="form-container">
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

        </div>

        <div className="col-md-2"></div>
        <div className="col-md-4">

        
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

        </div>
        <div className="col-md-1"></div>

        <p align="center" className="success-message mt-4">{formInput.successMsg}</p>
        <div align="center">
          <button type="submit" className="btn btn-primary mb-5">Submit</button>
        </div>


        </div>
        </form>





            </div>
            </div>
            </div>
        </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default AddNewContact;

