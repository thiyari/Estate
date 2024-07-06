import axios from "axios";
import '../App.css';
import {useState} from 'react';
import ImageUpload from './ImageUpload/ImageUpload';

function Register() {
   
    const [img,setImg] = useState([])
    const [formInput, setFormInput] = useState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      successMsg: ""
    });

    const [formError, setFormError] = useState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: ""
    })

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
          let inputError = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            confirmPassword: "",
          };


          // Check if first name is empty
          if(!formInput.fname){
            setFormError({
              ...inputError,
              fname: "First name should not be empty",
            })
            return;
          }

          // Check if last name is empty
          if(!formInput.lname){
            setFormError({
              ...inputError,
              lname: "Last name should not be empty",
            })
            return;
          }


          // Check if email and password are empty
          if(!formInput.email && !formInput.password){
            setFormError({
              ...inputError,
              email: "Enter a valid email address",
              password: "Password should not be empty",
            })
            return;
          }

          // Check if email is empty
          if(!formInput.email){
            setFormError({
              ...inputError,
              email: "Enter a valid email address",
            })
            return;
          }

          // Check if password and confirm password match
          if (formInput.confirmPassword !== formInput.password){
            setFormError({
              ...inputError,
              confirmPassword: "Password and Confirm password should be the same",
            });
            return;
          } 

          // Check if password is empty
          if (!formInput.password){
            setFormError({
              ...inputError,
              password: "Password should not be empty",
            });
            return;
          }

          // Clear any previous errors and show success message
          setFormError(inputError);
          setFormInput((prevState)=>({
            ...prevState,
            successMsg: "Validation Success",
          }));



        try {
          await axios.post("http://localhost:8000/user/create", JSON.stringify({
          firstname: formInput.fname,
          lastname: formInput.lname,
          email: formInput.email,
          password: formInput.password,
          images: img
          }),
          {
            headers:{
            "Content-Type":"application/json"
            }
          });
          console.log(img)
          alert("User Registation Successful");
          formInput({})
          setImg('')

        } catch (err) {
          alert(err);
        }
      }
    
    return (
      
     <div>
        <div className="container mt-4" >
    <div className="card">
    <h1 className="card-header"><center><div className="header-font">User Registration</div></center></h1>
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
          />
          </div>
        <p className="error-message">{formError.confirmPassword}</p>





        </div>
        <div className="col-md-2"></div>
        <div className="col-md-4">
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input type="text"  className="form-control mb-3" id="phone" placeholder="Phone"
          
          value=""
          onChange=""
          />
        </div>
        <div className="form-group">
          <label className="form-label">Area</label>
          <input type="text"  className="form-control mb-3" id="area" placeholder="Area of property"
          
          value=""
          onChange=""
          />
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input type="text"  className="form-control mb-3" id="property" placeholder="Property Location"
          
          value=""
          onChange=""
          />
        </div>
        <div className="form-group">
          <label className="form-label">PIN</label>
          <input type="text"  className="form-control mb-3" id="pin" placeholder="Pin Code"
          
          value=""
          onChange=""
          />
        </div>
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
              MK Works
      </div>
    </div>
    </div>
     </div>
    );
  }
  
  export default  Register;