import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import AdminSidebar from './Sidebar/AdminSidebar'
import { FaEdit,FaCheck } from "react-icons/fa";
import { properties } from '../properties.js'

const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const PHONE_REGEX = /(^[6-9]\d{9}$)|(^[789]\d{9}$)|(^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$)/;

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

function EditContacts(props){
    const [loggedIn, setLoggedIn] = useState(false)
    const { Id } = useParams()
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [fnametoggle,setFnametoggle] = useState(false)
    const [lnametoggle,setLnametoggle] = useState(false)
    const [emailtoggle,setEmailtoggle] = useState(false)
    const [phonetoggle,setPhonetoggle] = useState(false)
    const [formError, setFormError] = useState({...initialState})

    const navigate = useNavigate()

    const session = useCallback(async () =>{
      await axios.get(properties.REACT_APP_SERVER_URI+'/api/session')
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


    const contact = useCallback(async ()=>{
      await axios.get(properties.REACT_APP_SERVER_URI+'/api/contacts')
        .then(res => {
          const records = res.data.records
          const contact_doc = records.filter((doc) => (Id === doc._id))
            setFname(contact_doc[0].firstname)
            setLname(contact_doc[0].lastname)
            setEmail(contact_doc[0].email)
            setPhone(contact_doc[0].phone)
        })
        .catch(err => console.log(err))
    },[Id]) 


    axios.defaults.withCredentials = true;
    useEffect(()=>{
      session();
      contact();
    },[session, contact])


  // Initialize an object to track input errors
  let inputError = {...initialState};

  const handleFnameInput = (event) => {
    event.preventDefault()
    setFname(event.target.value);
  };

  const handleFnameEdit = (event) => {
    event.preventDefault()
    setFnametoggle(true)
  };

  const handleFnameSubmit = async (event) => {
    event.preventDefault()

          // Check if first name is empty
          if(!fname){
            setFormError({
              ...inputError,
              fname: "First name should not be empty",
              fname_status: "error"
            })
            return;
          }
    
    try{
      await axios.put(properties.REACT_APP_SERVER_URI+`/api/contacts/fname/${Id}`, 
        JSON.stringify({
        firstname: fname,
        }),
        {
          headers:{
          "Content-Type":"application/json"
          }
        });
        alert("First Name Updated Successfully");
        setFnametoggle(false)
      } catch (err) {
        alert(err);
      }
      setFormError(inputError);
  };  

  const handleLnameInput = (event) => {
    event.preventDefault()
    setLname(event.target.value);
  };

  const handleLnameEdit = (event) => {
    event.preventDefault()
    setLnametoggle(true)
  };


  const handleLnameSubmit = async (event) => {
    event.preventDefault()

          // Check if last name is empty
          if(!lname){
            setFormError({
              ...inputError,
              lname: "Last name should not be empty",
              lname_status: "error"
            })
            return;
          }

    try{
      await axios.put(properties.REACT_APP_SERVER_URI+`/api/contacts/lname/${Id}`,
       JSON.stringify({
        lastname: lname,
        }),
        {
          headers:{
          "Content-Type":"application/json"
          }
        });
        alert("Last Name Updated Successfully");
        setLnametoggle(false)
      } catch (err) {
        alert(err);
      }
      setFormError(inputError);
  };  

            
  const handleEmailInput = (event) => {
    event.preventDefault()
    setEmail(event.target.value);
  };

  const handleEmailEdit = (event) => {
    event.preventDefault()
    setEmailtoggle(true)
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault()


          // Check if email is empty
          if(!email){
            setFormError({
              ...inputError,
              email: "Email should not be empty",
              email_status: "error"
            })
            return;
          }


          const email_pattern = EMAIL_REGEX.test(email);
          if (!email_pattern) {
              setFormError({
                ...inputError,
                email: "Email format is incorrect",
                email_status: "error"
              });
              return;
          }

    try{
      await axios.put(properties.REACT_APP_SERVER_URI+`/api/contacts/email/${Id}`,
        JSON.stringify({
        email: email,
        }),
        {
          headers:{
          "Content-Type":"application/json"
          }
        });
        alert("Email Updated Successfully");
        setEmailtoggle(false)
      } catch (err) {
        alert(err);
      }
      setFormError(inputError);
  };


  const handlePhoneInput = (event) => {
    event.preventDefault()
    setPhone(event.target.value);
  };

  const handlePhoneEdit = (event) => {
    event.preventDefault()
    setPhonetoggle(true)
  };

  const handlePhoneSubmit = async (event) => {
    event.preventDefault()


          // Check if phone is empty
          if(!phone){
            setFormError({
              ...inputError,
              phone: "Phone number should not be empty",
              phone_status: "error"
            })
            return;
          }

          const phone_pattern = PHONE_REGEX.test(phone);
          if (!phone_pattern){
            setFormError({
              ...inputError,
              phone: "Invalid phone number",
              phone_status: "error"
            })
            return;
          }

    try{
      await axios.put(properties.REACT_APP_SERVER_URI+`/api/contacts/phone/${Id}`, 
        JSON.stringify({
        phone: phone,
        }),
        {
          headers:{
          "Content-Type":"application/json"
          }
        });
        alert("Phone Updated Successfully");
        setPhonetoggle(false)
      } catch (err) {
        alert(err);
      }
    };

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
            <div className="header-font">Edit Contact</div>
          </center>
        </h1>
          <div className="form-container">
            <div className="card-body">
        <form>
          <div className="row">
          <div className="col-md-12">
          <div className='row'>
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
    
    
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Particulars</th>
                <th scope="col">Details</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              
              <tr>
                <th scope="row">1</th>
                <td>First Name</td>
                <td>
                  { fnametoggle?
                    <input type="text"  
                      className="form-control" 
                      placeholder="First Name"
                      value={fname}
                      onChange={handleFnameInput} 
                      style={{borderColor: formError.fname_status !== "error" ?"":"red"}}
                    />
                  : <input type="text"  
                      className="form-control" 
                      placeholder="First Name"
                      name="fname"
                      value={fname}
                      disabled
                    />
                  }
                </td>
                <td>{ fnametoggle?
                  <button type="submit" onClick={handleFnameSubmit} style={{width:25}}><FaCheck /></button>
                  :<button type="submit" onClick={handleFnameEdit} style={{width:25}}><FaEdit /></button>
                  }
                </td> 
              </tr>
  
              <tr>
                <th scope="row">2</th>
                <td>Last Name</td>
                <td>{ lnametoggle? 
                  <input type="text"  
                    className="form-control" 
                    placeholder="Last Name"
                    value={lname}
                    onChange={handleLnameInput}
                    style={{borderColor: formError.lname_status !== "error" ?"":"red"}}
                    />
                : <input type="text"  
                    className="form-control" 
                    placeholder="Last Name"
                    value={lname}
                    disabled
                    />
                    }
                </td>
                <td>{ lnametoggle?
                  <button type="submit" onClick={handleLnameSubmit} style={{width:25}}><FaCheck /></button>
                  :<button type="submit" onClick={handleLnameEdit} style={{width:25}}><FaEdit /></button>
                  }
                </td>            
              </tr>
  
  
              <tr>
                <th scope="row">4</th>
                <td>Email</td>
                <td>
                {emailtoggle?
                  <input type="email"  
                    className="form-control" 
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailInput}
                    style={{borderColor: formError.email_status !== "error" ?"":"red"}}
                    />:
                    <input type="email"  
                    className="form-control" 
                    placeholder="Email"
                    value={email}
                    disabled
                    />}
                </td>
                <td>{ emailtoggle?
                  <button type="submit" onClick={handleEmailSubmit} style={{width:25}}><FaCheck /></button>
                  :<button type="submit" onClick={handleEmailEdit} style={{width:25}}><FaEdit /></button>
                  }
                </td>
              </tr>
  
              <tr>
                <th scope="row">5</th>
                <td>Phone</td>
                <td>
                 { phonetoggle?
                 <input type="phone"  
                    className="form-control" 
                    placeholder="Phone"
                    value={phone}
                    onChange={handlePhoneInput}
                    style={{borderColor: formError.phone_status !== "error" ?"":"red"}}
                 />
                :<input type="phone"  
                    className="form-control" 
                    placeholder="Phone"
                    value={phone}
                    disabled
                    />
                 }
                </td>
                <td>
                { phonetoggle?
                  <button type="submit" onClick={handlePhoneSubmit} style={{width:25}}><FaCheck /></button>
                  :<button type="submit" onClick={handlePhoneEdit} style={{width:25}}><FaEdit /></button>
                  }
                </td>
              </tr>
            </tbody>
          </table>  
  
    
  
    
              </div> 
              </div> 
              <div className="col-sm-3"></div>
    
            </div>
            </div>
            </form>
          </div>
          </div>
          <div align="center">
            <p className="error-message">
              {formError.fname}
              {formError.lname}
              {formError.email}
              {formError.phone} 
            </p>
          </div>
          </div>
          </div>
        </div>
    </div>
    </React.Fragment>          
    )
}

export default EditContacts;