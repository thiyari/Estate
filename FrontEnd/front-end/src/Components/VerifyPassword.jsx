import React, {useState, useEffect } from 'react'
import axios from "axios";

const PWD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

function VerifyPassword(){
  const [Id, setId] = useState('')

  const initialState = {
    new_password:"",
    confirm_new_password:"",
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



  useEffect(()=>{
  },[])



  async function submitHandler(event) {
    event.preventDefault();

    let inputError = {...initialState};
    

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
            await axios.put(`${process.env.REACT_APP_SERVER_URI}/api/changepassword/${Id}`, 
              JSON.stringify({
              password: formInput.new_password,
              }),
              {
                headers:{
                "Content-Type":"application/json"
                }
              });
              alert("Password Changed Successfully");
              setFormInput({
                new_password: "",
                confirm_new_password: ""
              })
            } catch (err) {
              alert(err);
            }
          
  }

return (
  <React.Fragment>
  <div className="row">
  <div className="col-md-12">


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

      </div>
      </div>
    </div>
</div>
</React.Fragment>
);
}

export default VerifyPassword;