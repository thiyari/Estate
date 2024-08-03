import {useState, useEffect, useCallback} from 'react';
import '../App.css';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const PHONE_REGEX = /(^[6-9]\d{9}$)|(^[789]\d{9}$)|(^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$)/;

function Checkout(props) {

  const initialState = {
    fname:"",
    lname:"",
    email:"",
    phone:"",
    comments: "",
    fname_status: "",
    lname_status: "", 
    email_status: "",
    phone_status: ""
  }


    const [loggedIn, setLoggedIn] = useState(false)
    const { propertyid } = useParams()
    const [profile, setProfile] = useState({})
    const [Images, setImages] = useState([])
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
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
            await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/services/create`, JSON.stringify({
            firstname: formInput.fname,
            lastname: formInput.lname,
            email: formInput.email,
            phone: formInput.phone,
            comments: formInput.comments,
            requests: propertyid
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
            setImages('')
            setProfile('')
            navigate('/');
          } catch (err) {
            alert(err);
          }

    }

    const session = useCallback(async ()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/session`)
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

    const property_id = useCallback(async ()=>{
      await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/${propertyid}`)
      .then(res => {
          const doc = res.data.records[0]
          setProfile(doc)

          let images = []
          for (let i = 0; i < doc.images.length; i++) {
             images.push(doc.images[i])
          }
          setImages(images)
      })
    },[propertyid])    

    axios.defaults.withCredentials = true;
    useEffect(()=>{
      session();
      property_id();
    },[session, property_id])

    return(
      <div className="container">
      <div className="row">
      <div className="col-md-1"></div>
          <div className="col-md-10">
          <div className="card form-container mt-4">
              <h1 className="card-header">
                  <center>
                    <div className="header-font">Request Submission</div>
                  </center>
              </h1>
              <div className="card-body" align="center">
              <div className='col-md-2'></div>
              <div className='col-md-8'>
              <h2 className='mb-2'>Details of Confirmation</h2>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Particulars</th>
                    <th scope="col">Details</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr>
                    <td>Property Id</td>
                    <td>{propertyid}</td>
                  </tr>
                  <tr>
                    <td>Type of Property</td>
                    <td>{profile.property}</td>
                  </tr>
                  <tr>
                    <td>Area</td>
                    <td>{profile.area} Sq. Ft</td>
                  </tr>
                  <tr>
                    <td>Phase</td>
                    <td>{profile.phase}</td>
                  </tr>
                  <tr>
                    <td>Rooms</td>
                    <td>{profile.rooms}</td>
                  </tr>
                  <tr>
                    <td>Floor</td>
                    <td>{profile.floor}</td>
                  </tr>
                  <tr>
                    <td>Locality</td>
                    <td>{profile.location}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>{profile.currency}{" "}{profile.price}</td>
                  </tr>
                </tbody>
              </table>



              <form>
              {Images.length === 0? <></>:
              <div className ="table-responsive-md">
                  <table className ="table">
                    <thead>
                      <tr>
                        <th scope="col" colSpan={3} >Images</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={3} align="center">
                              <img className="img-fluid" src={Images[currentPhotoIndex]} alt="Current images" width="500px" height="300px"/>
                        </td>
                      </tr>
                      <tr>
                          <td align="center"><button onClick={(e)=>{
                                    e.preventDefault();
                                    if (currentPhotoIndex > 0) {
                                      setCurrentPhotoIndex(currentPhotoIndex - 1);
                                    }
                          }}><i className="fa fa-angle-double-left" style={{fontSize:"18px"}}></i></button></td>
                          <td align="center"><p style={{fontWeight:"lighter"}}>[{currentPhotoIndex+1}/{Images.length}]</p></td>
                          <td align="center"><button onClick={(e)=>{
                                    e.preventDefault();
                                    if (currentPhotoIndex < Images.length - 1) {
                                      setCurrentPhotoIndex(currentPhotoIndex + 1);
                                    }
                          }}><i className="fa fa-angle-double-right" style={{fontSize:"18px"}}></i></button></td>              
                      </tr>
                    </tbody>
                  </table>
              </div>
              }
              </form>




              <form onSubmit={submitHandler}>
              <h2 className='mt-2'>Contact Details</h2>
                <div className='row form-container border mt-4'>
                  <div className='mt-4'></div>
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
                    <div className='mt-4'></div>



                </div>
                <p align="center" className="success-message mt-4">{formInput.successMsg}</p>

                <button type="submit" className="btn btn-primary mb-4">send</button>
                </form>
                </div>
                <div className='col-md-2'></div>
              </div>
          </div>
        </div>
      <div className="col-md-1"></div>
  </div>
  </div>
    )
}

export default Checkout;