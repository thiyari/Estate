import axios from "axios";
import '../App.css';
import {useState} from 'react';
import ImageUpload from './ImageUpload/ImageUpload';

function Register() {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const [img,setImg] = useState([])


    const setImages = (images)=>{
      setImg(images);
    }

    async function submitHandler(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8000/user/create", JSON.stringify({
          firstname: fname,
          lastname: lname,
          email: email,
          password: password,
          images: img
          }),
        {
          headers:{
          "Content-Type":"application/json"
          }
        });
          console.log(img)
          alert("User Registation Successful");
          setFName('')
          setLName('')
          setEmail('')
          setImg('')
          setPassword('')

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
          <input type="text"  className="form-control mb-3" id="fname" placeholder="First Name"
          
          value={fname}
          onChange={(event) => {
            setFName(event.target.value);
          }}
          />
        </div>

        <div className="form-group">
            <label className="form-label">Last name</label>
            <input type="text"  className="form-control mb-3" id="lname" placeholder="Last Name"
            
            value={lname}
            onChange={(event) => {
              setLName(event.target.value);
            }}
            
            />
          </div>
    
        <div className="form-group">
          <label className="form-label">email</label>
          <input type="email"  className="form-control mb-3" id="email" placeholder="Email"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />
          
        </div>

        <div className="form-group">
            <label className="form-label">password</label>
            <input type="password"  className="form-control mb-3" id="password" placeholder="Remeber password"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>
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