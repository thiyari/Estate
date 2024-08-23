import axios from "axios";
import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import {properties} from '../properties.js'

const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const initialState = {
  email: "",
  email_status: "",
};

function ForgotPassword(props) {

    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({...initialState,successMsg: ""});
    const [formError, setFormError] = useState({...initialState})

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
          // Clear any previous errors and show success message
          setFormError(inputError);
          setFormInput((prevState)=>({
            ...prevState,
            successMsg: "Verification Successful, Saving the details",
          }));

          try {
            await axios.post(properties.REACT_APP_SERVER_URI+'/api/forgot-password', JSON.stringify({
            email: formInput.email,
            }),
            {
              headers:{
              "Content-Type":"application/json"
              }
            }).then((res)=>{
              console.log(res)
              alert(res.data.output)
              setFormInput({
                email: "",
              })
              navigate('/');
            })
          } catch (err) {
            alert(err);
          }

          
    }

    return (
     <div>
          <div className="container mt-4">
            <div className="card">

            <h1 className="card-header"><center><div className="header-font">Forget Password</div></center></h1>

             <div className="row">
             <div className="col-sm-4"></div>
             <div className="col-sm-4">
             <div className="card-body">
             <form>
 
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

            <div align="center">
              <button type="submit" className="btn btn-primary mt-4" onClick={submitHandler} >Submit</button>
            </div>

              </form>
            </div>
            </div>
            <div className="col-sm-4"></div>
            </div>
            <div className="card-footer text-muted">
                  <p>
                    Not yet registered?<br />
                    <span className="line">
                    <a href="/Register">Register</a>
                    </span>
                  </p>  
            </div>
            </div>
            </div>
     </div>
    );
  }
  
  export default ForgotPassword;