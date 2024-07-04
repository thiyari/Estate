import axios from "axios";
import '../App.css';
import {useState, useEffect} from 'react';
import ImageUpload from './ImageUpload/ImageUpload';

function Register() {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const [img,setImg] = useState([])
    const [allImage,setAllImage] = useState([])


    const setImages = (images)=>{
      setImg(images);
    }

  
    const fetchImage = async()=>{
      const res = await fetch("http://estateserver-vi8u.onrender.com")
      const doc_res = await res.json()
      const img_data = doc_res.data[doc_res.data.length-1].images
      setAllImage(img_data)
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
          fetchImage()

        } catch (err) {
          alert(err);
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
          <div className="form-group">
            <br></br>
            <ImageUpload img={img} onSetImg={setImages}/>
          </div>

        <button type="submit" className="btn btn-primary mt-4" onClick={save} >Save</button>
        <div className='allimage'>
          {
            allImage.map((image,index) =>{
              return (
                <div className={"row"} key={index}>
                <img src={image} width={"250px"} height={"180px"} alt={"image-" + index}/>
                </div> )
            })
          }
        </div>       
      </form>
    </div>

    </div>
     </div>
    );
  }
  
  export default  Register;