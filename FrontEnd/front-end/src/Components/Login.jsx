import axios from "axios";
import {  useState } from "react";
import { useNavigate } from 'react-router-dom';


const initialState = {
  email: "",
  password: "",
  email_status: "",
  password_status: "",
};

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [formError, setFormError] = useState({...initialState})
    let inputError = {...initialState};

    
    async function login(event) {
        event.preventDefault();

        // Check if email is empty
    if(!email){
      setFormError({
        ...inputError,
        email: "Email should not be empty",
        email_status: "error"
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
          await axios.post("http://localhost:8000/user/login", {
            email: email,
            password: password,
            }).then((res) => 
            {
             console.log(res)
             const data = res.data;
             
             if (data.status === true) 
             {
                alert("Login Successful"); 
                navigate('/Profile');
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
             <div className="col-sm-3"></div>
             <div className="col-sm-6">
             <div className="card-body">
             <form>
             <div className="form-group">
                  <label className="form-label">email</label>
                  <input type="email"  
                  className="form-control mb-3" 
                  id="email" 
                  placeholder="Enter Name"
                  style={{borderColor: formError.email_status !== "error" ?"":"red"}}  
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  />
              </div>
              <p className="error-message">{formError.email}</p>


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

                  <button type="submit" className="btn btn-primary mt-4" onClick={login} >Login</button>
              </form>
            </div>
            </div>
            <div className="col-sm-3"></div>
            </div>
            <div class="card-footer text-muted">
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
  
  export default Login;