import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./Sidebar/AdminSidebar";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const PWD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const PHONE_REGEX = /(^[6-9]\d{9}$)|(^[789]\d{9}$)|(^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$)/;

function AddNewAdmin(props) {

    const initialState = {
        fname:"",
        lname:"",
        user:"",
        email:"",
        password:"",
        confirmPassword:"",
        phone:"",
        user_status: "",
        fname_status: "",
        lname_status: "", 
        email_status: "",
        password_status: "",
        confirmPassword_status: "",
        phone_status: "",
    }

    const [formInput, setFormInput] = useState({...initialState,successMsg: ""});
    const [formError, setFormError] = useState({...initialState})
    const [loggedIn, setLoggedIn] = useState(false)
    const [usernames, setUsernames] = useState([]);
    const [emails, setEmails] = useState([]);

    const navigate = useNavigate()

    const handleUserInput = (name, value) => {
        setFormInput({
          ...formInput,
          [name]: value,
        });
      };

    const users = useCallback(async ()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/users`)
      .then(res => {
        if(res.data.status){
          const doc_users = res.data.users          
          let users_list = []
          let emails_list = [] 
          for (let i = 0; i < doc_users.data.length; i++) {
             users_list.push(doc_users.data[i].username)
             emails_list.push(doc_users.data[i].email)
          }
          setUsernames(users_list)
          setEmails(emails_list)
        }     
      })
      .catch(err => console.log(err))
    },[])
    
    
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


          // Check if email already exists
          for (let i = 0; i < emails.length; i++) {
            if(formInput.email === emails[i]){
                setFormError({
                  ...inputError,
                  email: "This email already exists, please provide another",
                  email_status: "error"
                })
              return;
            }
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

          // Clear any previous errors and show success message
          setFormError(inputError);
          setFormInput((prevState)=>({
            ...prevState,
            successMsg: "Verification Successful, Saving the details",
          }));

        try {
          await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/create`, JSON.stringify({
          firstname: formInput.fname,
          lastname: formInput.lname,
          username: formInput.user,
          email: formInput.email,
          password: formInput.password,
          phone: formInput.phone,
          logstatus: "admin"
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
          })
          setUsernames('')
          navigate('/ManageAdmins');
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
              <div className="header-font">Add New Admin</div>
            </center>
          </h1>
            <div className="form-container">
                <div className="card-body"></div>       
                <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
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
        </div>

        <div className="col-md-2"></div>
        <div className="col-md-4">

        
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

        </div>
        <div className="col-md-1"></div>

        <p align="center" className="success-message mt-4">{formInput.successMsg}</p>
        <div align="center">
          <button type="submit" className="btn btn-primary mb-5">Submit</button>
        </div>


        </div>
        </form>
        </div>
        <div className="col-md-1"></div>
        </div>




            </div>
            </div>
        </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default AddNewAdmin;

