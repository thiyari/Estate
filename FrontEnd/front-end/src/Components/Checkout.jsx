import {useState, useEffect, useCallback} from 'react';
import '../App.css';
import axios from "axios";
import { useParams } from "react-router-dom";

function Checkout(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const { propertyid } = useParams()
    const [profile, setProfile] = useState({})
    const [Images, setImages] = useState([])
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const session = useCallback(async ()=>{
      await axios.get('http://localhost:8000/api/session')
      .then(res => {
        if(res.data.valid){
          setLoggedIn(res.data.isLoggedIn);
          props.LoginStatus(loggedIn);
        } else {
          props.LoginStatus(!loggedIn);
        }
      })
      .catch(err => console.log(err))
    },[props, loggedIn])

    const property_id = useCallback(async ()=>{
      await axios.get(`http://localhost:8000/api/${propertyid}`)
      .then(res => {
          const doc = res.data.records[0]
          setProfile(doc)

          let images = []
          for (let i = 0; i < doc.images.length; i++) {
             images.push(doc.images[i])
          }
          setImages(images)
      })
    },[propertyid])    

    axios.defaults.withCredentials = true;
    useEffect(()=>{
      session();
      property_id();
    },[session, property_id])

    return(
      <div className="row">
      <div className="col-md-2"></div>
          <div className="col-md-8">
          <div className="card form-container mt-4">
              <h1 className="card-header">
                  <center>
                    <div className="header-font">Request Submission</div>
                  </center>
              </h1>
              <div className="card-body" align="center">
              <div className='col-md-2'></div>
              <div className='col-md-8'>
              <h2 className='mb-2'>Details of Confirmation</h2>
              <table className="table table-striped border">
                <thead>
                  <tr>
                    <th scope="col">Particulars</th>
                    <th scope="col">Details</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr>
                    <td>Property Id</td>
                    <td>{propertyid}</td>
                  </tr>
                  <tr>
                    <td>Type of Property</td>
                    <td>{profile.property}</td>
                  </tr>
                  <tr>
                    <td>Area</td>
                    <td>{profile.area}</td>
                  </tr>
                  <tr>
                    <td>Phase</td>
                    <td>{profile.phase}</td>
                  </tr>
                  <tr>
                    <td>Rooms</td>
                    <td>{profile.rooms}</td>
                  </tr>
                  <tr>
                    <td>Floor</td>
                    <td>{profile.floor}</td>
                  </tr>
                  <tr>
                    <td>Locality</td>
                    <td>{profile.location}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>{profile.currency}{" "}{profile.price}</td>
                  </tr>
                </tbody>
              </table>





              <div className ="table-responsive-md">
                  <table className ="table">
                    <thead>
                      <tr>
                        <th scope="col" colSpan={3} >Images</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={3} align="center">
                              <img className="img-fluid" src={Images[currentPhotoIndex]} alt="Current images" width="500px" height="300px"/>
                        </td>
                      </tr>
                      <tr>
                          <td align="center"><button onClick={()=>{
                                    if (currentPhotoIndex > 0) {
                                      setCurrentPhotoIndex(currentPhotoIndex - 1);
                                    }
                          }}><i className="fa fa-angle-double-left" style={{fontSize:"18px"}}></i></button></td>
                          <td align="center"><p style={{fontWeight:"lighter"}}>[{currentPhotoIndex+1}/{Images.length}]</p></td>
                          <td align="center"><button onClick={()=>{
                                    if (currentPhotoIndex < Images.length - 1) {
                                      setCurrentPhotoIndex(currentPhotoIndex + 1);
                                    }
                          }}><i className="fa fa-angle-double-right" style={{fontSize:"18px"}}></i></button></td>              
                      </tr>
                    </tbody>
                  </table>
              </div>





              
              <h2 className='mt-2'>Contact Details</h2>
                <div className='row form-container border'>
                  <div className='mt-4'></div>
                  <div className='col-md-1'></div>
                  <div className='col-md-4'>
                      <div className="form-group" align="left">
                          <label className="form-label">First Name</label>
                          <input 
                            type="text"  
                            className="form-control mb-3" 
                            id="fname" 
                            placeholder="Your First Name"
                            name="fname"
                            />
                      </div>
                      <div className="form-group" align="left">
                          <label className="form-label">Email</label>
                          <input 
                            type="email"  
                            className="form-control mb-3" 
                            id="email" 
                            placeholder="Your Email"
                            name="email"
                            />
                      </div>
                  </div>
                  <div className='col-md-2'></div>
                  <div className='col-md-4'>
                  <div className="form-group" align="left">
                        <label className="form-label">Last Name</label>
                        <input 
                            type="text"  
                            className="form-control mb-3" 
                            id="lname" 
                            placeholder="Your Last Name"
                            name="lname"
                            />
                      </div>
                      <div className="form-group" align="left">
                          <label className="form-label">Phone</label>
                          <input 
                            type="text"  
                            className="form-control mb-3" 
                            id="pho9ne" 
                            placeholder="Your Phone"
                            name="phone"
                            />
                      </div>
                  </div>
                  <div className='col-md-1'></div>
                
                
                </div>
                </div>
                <div className='col-md-2'></div>
              </div>
          </div>
        </div>
      <div className="col-md-2"></div>
  </div>
    )
}

export default Checkout;