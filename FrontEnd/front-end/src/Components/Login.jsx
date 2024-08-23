import axios from "axios";
import {  useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import {properties} from '../properties.js'

const initialState = {
  user: "",
  password: "",
  user_status: "",
  password_status: "",
};

function Login() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [formError, setFormError] = useState({...initialState})

    let inputError = {...initialState};

    const session = useCallback(async () => {
      await axios.get(properties.REACT_APP_SERVER_URI+'/api/session')
      .then(res => {
        if(res.data.valid && res.data.logstatus === "user"){
          setUser(res.data.user);
          navigate('/Profile')
        } else if (res.data.valid && res.data.logstatus === "admin") {
          setUser(res.data.user);
          navigate('/AdminProfile')
        } else {
          navigate('/Login')
        }
      })
      .catch(err => console.log(err))
    },[navigate])

    axios.defaults.withCredentials = true;
    useEffect(()=>{
      session();
    },[session])


    async function login(event) {
        event.preventDefault();

        // Check if username is empty
    if(!user){
      setFormError({
        ...inputError,
        user: "Username should not be empty",
        user_status: "error"
            })
        return;
      }

      // Check if password is empty
      if(!password){
            setFormError({
              ...inputError,
              password: "Password should not be empty",
              password_status: "error"
            })
        return;
      }


        try {
          await axios.post(properties.REACT_APP_SERVER_URI+'/api/login', {
            user: user,
            password: password,
            }).then((res) => 
            {
             const data = res.data;
             if (data.status === true && data.logstatus === "user") 
             {
                alert("User Login Successful"); 
                navigate('/Profile');
             } else if (data.status === true && data.logstatus === "admin") {
                alert("Admin Login Successful"); 
                navigate('/AdminProfile');
             }
             else 
             {
                alert("Login Failed")
             }  
          }, fail => {
           console.error(fail); // Error!
      });
        }

 
         catch (err) {
          alert(err);
        }
      
      }
      


    return (
     <div>
          <div className="container mt-4">
            <div className="card">

            <h1 className="card-header"><center><div className="header-font">User Login</div></center></h1>

             <div className="row">
             <div className="col-sm-4"></div>
             <div className="col-sm-4">
             <div className="card-body">
             <form>
             <div className="form-group">
                  <label className="form-label">Username or Email</label>
                  <input type="text"  
                  className="form-control mb-3" 
                  id="user" 
                  placeholder="Enter Name"
                  style={{borderColor: formError.user_status !== "error" ?"":"red"}}  
                  value={user}
                  onChange={(event) => {
                    setUser(event.target.value);
                  }}
                  />
              </div>
              <p className="error-message">{formError.user}</p>


        <div className="form-group">
            <label className="form-label">password</label>
            <input type="password"  
            className="form-control mb-3" 
            id="password" 
            placeholder="Enter password"
            style={{borderColor: formError.password_status !== "error" ?"":"red"}}  
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>
          <p className="error-message">{formError.password}</p>

            <div align="center">
              <button type="submit" className="btn btn-primary mt-4" onClick={login} >Login</button>
            </div>

              </form>
            </div>
            </div>
            <div className="col-sm-4"></div>
            </div>
            <div className="card-footer text-muted">
                  <div>
                    Not yet registered?<br />
                      <div className="row">
                        <div className="col-md-6"><a href="/Register">Register</a></div>
                        <div align="right" className="col-md-6"><a href="/ForgotPassword">Forgot Password?</a></div>
                    </div>
                  </div>  
            </div>
            </div>
            </div>
     </div>
    );
  }
  
  export default Login;