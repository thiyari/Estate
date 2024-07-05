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

    async function save(event) {
        event.preventDefault();
        try {
          await axios.post("http://estateserver-vi8u.onrender.com/user/create", JSON.stringify({
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
            <h1><center>User Registation</center></h1>
    <div className="row">
		  <div className="col-sm-1"></div>
			<div className="col-sm-10 form-container">
    <form>
      <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-4">
        <div className="form-group">
          <label>First name</label>
          <input type="text"  className="form-control" id="fname" placeholder="First Name"
          
          value={fname}
          onChange={(event) => {
            setFName(event.target.value);
          }}
          />
        </div>

        <div className="form-group">
            <label>Last name</label>
            <input type="text"  className="form-control" id="lname" placeholder="Last Name"
            
            value={lname}
            onChange={(event) => {
              setLName(event.target.value);
            }}
            
            />
          </div>
    
        <div className="form-group">
          <label>email</label>
          <input type="email"  className="form-control" id="email" placeholder="Email"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />
          
        </div>

        <div className="form-group">
            <label>password</label>
            <input type="password"  className="form-control" id="password" placeholder="Remeber password"
            
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
          <label>Phone</label>
          <input type="text"  className="form-control" id="phone" placeholder="Phone"
          
          value=""
          onChange=""
          />
        </div>
        <div className="form-group">
          <label>Area</label>
          <input type="text"  className="form-control" id="area" placeholder="Area of property"
          
          value=""
          onChange=""
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text"  className="form-control" id="property" placeholder="Property Location"
          
          value=""
          onChange=""
          />
        </div>
        <div className="form-group">
          <label>PIN</label>
          <input type="text"  className="form-control" id="pin" placeholder="Pin Code"
          
          value=""
          onChange=""
          />
        </div>
        </div>
        <div className="col-md-1"></div>
        <div className="form-group">
            <br></br>
            <ImageUpload img={img} onSetImg={setImages}/>
          </div>
        <button type="submit" className="btn btn-primary mt-4" onClick={save} >Save</button>
        </div>     
      </form>
      </div>
      <div className="col-sm-1"></div>
      </div>
    </div>
    </div>
     </div>
    );
  }
  
  export default  Register;