import axios from "axios";
import {  useState } from "react";

function Register() {

    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function save(event) {
        event.preventDefault();
        try {
          await axios.post("http://estateserver-nrie.onrender.com/user/create", {
          firstname: fname,
          lastname: lname,
          email: email,
          password: password,
          });
          alert("User Registation Successfully");

        } catch (err) {
          alert(err);
        }
      }

    return (
     <div>
        <div className="container mt-4" >
    <div className="card">
            <h1>User Registation</h1>
    
    <form>
        <div className="form-group">
          <label>First name</label>
          <input type="text"  className="form-control" id="fname" placeholder="Enter Name"
          
          value={fname}
          onChange={(event) => {
            setFName(event.target.value);
          }}
          />

          
        </div>

        <div className="form-group">
            <label>Last name</label>
            <input type="text"  className="form-control" id="lname" placeholder="Enter Name"
            
            value={lname}
            onChange={(event) => {
              setLName(event.target.value);
            }}
            
            />
          </div>
    
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
            <input type="password"  className="form-control" id="password" placeholder="Enter Fee"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>


    
        <button type="submit" className="btn btn-primary mt-4" onClick={save} >Save</button>
       
      </form>
    </div>




    </div>



     </div>
    );
  }
  
  export default  Register;
