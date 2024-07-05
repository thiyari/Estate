import axios from "axios";
import {  useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
          await axios.post("http://estateserver-vi8u.onrender.com/user/login", {
            email: email,
            password: password,
            }).then((res) => 
            {
             console.log(res)
             const data = res.data;
             
             if (data.status === true) 
             {
                alert("Login Successful"); 
                navigate('/home');
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
          <input type="email"  className="form-control mb-3" id="email" placeholder="Enter Name"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />
          
          
          
        </div>

        <div className="form-group">
            <label className="form-label">password</label>
            <input type="password"  className="form-control mb-3" id="password" placeholder="Enter password"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>
                  <button type="submit" className="btn btn-primary mt-4" onClick={login} >Login</button>
              </form>
            </div>
            </div>
            <div className="col-sm-3"></div>
            </div>
            <div class="card-footer text-muted">
              MK Works
            </div>
            </div>
            </div>
     </div>
    );

  }
  
  export default Login;