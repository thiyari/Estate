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
            <div className="container">
            <div className="row">
                <h2>Login</h2>
             <hr/>
             </div>

             <div className="row">
             <div className="col-sm-6">
 
             <form>
             <div className="form-group">
          <label>email</label>
          <input type="email"  className="form-control" id="email" placeholder="Enter Name"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />
          
          
          
        </div>

        <div className="form-group">
            <label>password</label>
            <input type="password"  className="form-control" id="password" placeholder="Enter password"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>
                  <button type="submit" className="btn btn-primary" onClick={login} >Login</button>
              </form>

            </div>
            </div>
            </div>

     </div>
    );


  }
  
  export default Login;