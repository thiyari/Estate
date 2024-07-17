import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import { FaEdit,FaCheck } from "react-icons/fa";

function Profile(props){
  const [user, setUser] = useState('')
  const [fnametoggle,setFnametoggle] = useState(false)
  const [lnametoggle,setLnametoggle] = useState(false)
  const [usertoggle,setUsertoggle] = useState(false)
  const [emailtoggle,setEmailtoggle] = useState(false)
  const [phonetoggle,setPhonetoggle] = useState(false)
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:8000/api/session')
    .then(res => {
      if(res.data.valid){
        setUser(res.data.username);
        props.onLogin(true)
      } else {
        props.onLogin(false)
        navigate('/Login')
      }
    })
    .catch(err => console.log(err))
  },[navigate, props])

  const handleFnameEdit = (event) => {
    event.preventDefault()
    setFnametoggle(true)
  };

  const handleFnameSubmit = (event) => {
    event.preventDefault()
    setFnametoggle(false)
  };  


  const handleLnameEdit = (event) => {
    event.preventDefault()
    setLnametoggle(true)
  };

  const handleLnameSubmit = (event) => {
    event.preventDefault()
    setLnametoggle(false)
  };  


  const handleUserEdit = (event) => {
    event.preventDefault()
    setUsertoggle(true)
  };

  const handleUserSubmit = (event) => {
    event.preventDefault()
    setUsertoggle(false)
  };  

  const handleEmailEdit = (event) => {
    event.preventDefault()
    setEmailtoggle(true)
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault()
    setEmailtoggle(false)
  };

  const handlePhoneEdit = (event) => {
    event.preventDefault()
    setPhonetoggle(true)
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault()
    setPhonetoggle(false)
  };

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
          <div className="header-font">User Profile</div>
        </center>
      </h1>
        <div className="form-container">
          <div className="card-body">
      <form onSubmit="">
        <div className="row">
        <div className="col-md-12">
        <div className='row'>
        <div className="col-sm-3"></div>
        <div className="col-sm-6">

        <h1 align="center">Welcome {user}</h1>
  
  
        <table className="table table-striped ">
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
                    id="firstname" 
                    placeholder="First Name"
                  />
                : <input type="text"  
                    className="form-control" 
                    id="firstname" 
                    placeholder="First Name"
                    disabled
                  />
                }
              </td>
              <td>{ fnametoggle?
                <button onClick={handleFnameSubmit} style={{width:25}}><FaCheck /></button>
                :<button onClick={handleFnameEdit} style={{width:25}}><FaEdit /></button>
                }
              </td>               
            </tr>

            <tr>
              <th scope="row">2</th>
              <td>Last Name</td>
              <td>{ lnametoggle? 
                <input type="text"  
                  className="form-control" 
                  id="lastname" 
                  placeholder="Last Name"
                  />
              : <input type="text"  
                  className="form-control" 
                  id="lastname" 
                  placeholder="Last Name"
                  disabled
                  />
                  }
              </td>
              <td>{ lnametoggle?
                <button onClick={handleLnameSubmit} style={{width:25}}><FaCheck /></button>
                :<button onClick={handleLnameEdit} style={{width:25}}><FaEdit /></button>
                }
              </td>            
            </tr>

            <tr>
              <th scope="row">3</th>
              <td>User Name</td>
              <td>
              { usertoggle?
                  <input type="text"  
                    className="form-control" 
                    id="username" 
                    placeholder="User Name"
                  />
                :<input type="text"  
                  className="form-control" 
                  id="username" 
                  placeholder="User Name"
                  disabled
                  />
                  }
              </td>
              <td>{ usertoggle?
                <button onClick={handleUserSubmit} style={{width:25}}><FaCheck /></button>
                :<button onClick={handleUserEdit} style={{width:25}}><FaEdit /></button>
                }
              </td>
            </tr>

            <tr>
              <th scope="row">4</th>
              <td>Email</td>
              <td>
              {emailtoggle?<input type="email"  
                  className="form-control" 
                  id="email" 
                  placeholder="Email"
                  />:
                  <input type="email"  
                  className="form-control" 
                  id="email" 
                  placeholder="Email"
                  disabled
                  />}
              </td>
              <td>{ emailtoggle?
                <button onClick={handleEmailSubmit} style={{width:25}}><FaCheck /></button>
                :<button onClick={handleEmailEdit} style={{width:25}}><FaEdit /></button>
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
                  id="phone" 
                  placeholder="Phone"
               />
              :<input type="phone"  
                  className="form-control" 
                  id="phone" 
                  placeholder="Phone"
                  disabled
                  />
               }
              </td>
              <td>
              { phonetoggle?
                <button onClick={handlePhoneSubmit} style={{width:25}}><FaCheck /></button>
                :<button onClick={handlePhoneEdit} style={{width:25}}><FaEdit /></button>
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
  )
}

export default Profile;