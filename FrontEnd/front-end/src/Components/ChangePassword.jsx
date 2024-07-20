import Sidebar from './Sidebar/Sidebar'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const PWD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

function ChangePassword(props){
  const [loggedIn, setLoggedIn] = useState(false)
  const [Id, setId] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
  const initialState = {
    old_password:"",
    new_password:"",
    confirm_new_password:"",
    old_password_status: "",
    new_password_status: "",
    confirm_new_password_status: "",
  }


  const [formInput, setFormInput] = useState({...initialState,successMsg: ""});
  const [formError, setFormError] = useState({...initialState})

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };


  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:8000/api/session')
    .then(res => {
      if(res.data.valid){
        setUser(res.data.username);
        setPassword(res.data.password);
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



  async function submitHandler(event) {
    event.preventDefault();

    let inputError = {...initialState};

          // Check if old password is empty
          if(!formInput.old_password){
            setFormError({
              ...inputError,
              old_password: "Old Password should not be empty",
              old_password_status: "error"
            })
            return;
          }

 
           // Check for old password match
           if(formInput.old_password !== password){
            setFormError({
              ...inputError,
              old_password: "Old Password didn't match",
              old_password_status: "error"
            })
            return;
          }         

          // Check if new password is empty
          if(!formInput.new_password){
            setFormError({
              ...inputError,
              new_password: "New Password should not be empty",
              new_password_status: "error"
            })
            return;
          }


          const new_password_pattern = PWD_REGEX.test(formInput.new_password);
          if (!new_password_pattern) {
              setFormError({
                ...inputError,
                new_password: "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters",
                new_password_status: "error"
              });
              return;
          }

          // Check if old password and new passwords match
          if(formInput.new_password === password){
            setFormError({
              ...inputError,
              new_password: "Old Password and New password should not be same",
              new_password_status: "error"
            })
            return;
          }

          // Check if confirm new password is empty
          if(!formInput.confirm_new_password){
            setFormError({
              ...inputError,
              confirm_new_password: "Confirm Password should not be empty",
              confirm_new_password_status: "error"
            })
            return;
          }



          // Check if new password and confirm new password match
          if (formInput.confirm_new_password !== formInput.new_password){
            setFormError({
              ...inputError,
              confirm_new_password: "New Password and Confirm password should be the same",
              confirm_new_password_status: "error"
            });
            return;
          } 



          // Clear any previous errors and show success message
          setFormError(inputError);
          setFormInput((prevState)=>({
            ...prevState,
            successMsg: "Verification Successful, Saving the details",
          }));


          try{
            await axios.put(`http://localhost:8000/api/changepassword/${Id}`, 
              { body: JSON.stringify({
              username: user,
              password: formInput.new_password,
              })},
              {
                headers:{
                "Content-Type":"application/json"
                }
              });
              alert("Password Changed Successfully");
              setFormInput({
                old_password: "",
                new_password: "",
                confirm_new_password: ""
              })
              setUser('');
              setPassword('');
            } catch (err) {
              alert(err);
            }
          
  }

return (
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
        <div className="header-font">Change Password</div>
      </center>
    </h1>
			<div className="form-container">
        <div className="card-body">
    <form onSubmit={submitHandler}>
      <div className="row">
      <div className="col-md-12">
      <div className='row'>
      <div className="col-sm-4"></div>
      <div className="col-sm-4">
      <div className="form-group">
          <label className="form-label">Old Password</label>
          <input 
          type="password"  
          className="form-control mb-3" 
          id="old_password" 
          placeholder="Enter Old Password"
          name="old_password"
          value={formInput.old_password}
          onChange={({target})=>{            
            handleUserInput(target.name, target.value)
          }} 
          style={{borderColor: formError.old_password_status !== "error" ?"":"red"}}
          />
          </div>
        <p className="error-message">{formError.old_password}</p>




      <div className="form-group">
          <label className="form-label">New Password</label>
          <input 
          type="password"  
          className="form-control mb-3" 
          id="new_password" 
          placeholder="Enter New Password"
          name="new_password"
          value={formInput.new_password}
          onChange={({target})=>{            
            handleUserInput(target.name, target.value)
          }} 
          style={{borderColor: formError.new_password_status !== "error" ?"":"red"}}
          />
          </div>
        <p className="error-message">{formError.new_password}</p>



        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input 
          type="password"  
          className="form-control mb-3" 
          id="confirm_new_password" 
          placeholder="Confirm New Password"
          name="confirm_new_password"
          value={formInput.confirm_new_password}
          onChange={({target})=>{            
            handleUserInput(target.name, target.value)
          }} 
          style={{borderColor: formError.confirm_new_password_status !== "error" ?"":"red"}}
          />
          </div>
        <p className="error-message">{formError.confirm_new_password}</p>


        <p align="center" className="success-message">{formInput.successMsg}</p>


        <div align="center">
          <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </div>

          </div> 
          </div> 
          <div className="col-sm-4"></div>

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
);
}

export default ChangePassword;