import axios from "axios";

import '../App.css';
import { PiUploadSimpleBold } from "react-icons/pi";
import {useState, useEffect} from 'react';

function Register() {

    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function save(event) {
        event.preventDefault();
        try {
          await axios.post("https://estateserver-vi8u.onrender.com/user/create", {
          firstname: fname,
          lastname: lname,
          email: email,
          password: password,
          });
          alert("User Registation Successful");

        } catch (err) {
          alert(err);
        }
      }


      const [img,setImg] = useState("")
      const [allImage,setAllImage] = useState([])
    
      const imagebased64 = async (file)=>{
        const reader = new FileReader()
        await reader.readAsDataURL(file)
        const data = new Promise((resolve,reject)=>{
          reader.onload = () => resolve(reader.result)
          reader.onerror = (err) => reject(err)
        })
        return data
      }
    
      const handleUploadImage = async(e)=>{
        const file = e.target.files[0]
        const image = await imagebased64(file)
        console.log(image)
        setImg(image)
      }
    
      const fetchImage = async()=>{
        const res = await fetch("http://localhost:8000/")
        const data = await res.json()
        setAllImage(data.data)
      }
    
      const handleSubmit = async(e)=>{
        e.preventDefault()
        if(img){
          const res = await fetch("http://localhost:8000/user/upload",{
            method: "POST",
            headers:{
              "content-type":"application/json"
            },
            body: JSON.stringify({img:img})
          })
          const data = await res.json()
          console.log(data)
          if(data.status){
            alert(data.message)
            setImg('')
            fetchImage()
          }
        }
    
      }
    
      useEffect(()=>{
        fetchImage()
      },[])
    


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
            <input type="password"  className="form-control" id="password" placeholder="Enter password"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>

          <div className='imageContainer'>
        <form>
          <label htmlFor='uploadImage'>
            <div className='uploadBox'>
              <input type='file' id='uploadImage' onChange={handleUploadImage}/>
              { img ? <img src={img} alt=''/>:<PiUploadSimpleBold/>}
            </div>
          </label>
          <div className='btn'>
            <button onClick={handleSubmit}>upload</button>
          </div>
        </form>
        <div className='allimage'>
          {
            allImage.map(e1 =>{
              return <img src={e1.image} width={"250px"} height={"180px"} alt=''/>
            })
          }
        </div>
      </div>

    
        <button type="submit" className="btn btn-primary mt-4" onClick={save} >Save</button>
       
      </form>
    </div>




    </div>



     </div>
    );
  }
  
  export default  Register;
