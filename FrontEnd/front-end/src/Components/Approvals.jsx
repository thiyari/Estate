import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "./Sidebar/AdminSidebar";

function Approvals(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const { propertyId } = useParams()
    const [Id, setId] = useState('')
    const [propertyLocation, setPropertyLocation] = useState('')
    const [propertyArea, setPropertyArea] = useState('')
    const [propertyType, setPropertyType] = useState('')
    const [phase, setPhase] = useState('')
    const [rooms, setRooms] = useState('')
    const [floor, setFloor] = useState('')
    const [currency, setCurrency] = useState('')
    const [price, setPrice] = useState('')
    const [zip, setZip] = useState('')
    const [propertyAddress, setPropertyAddress] = useState('')
    const [Images, setImages] = useState([])
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const navigate = useNavigate()
    const session = useCallback(async () =>{
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/session`)
        .then(res => {
          if(res.data.valid){
            setLoggedIn(res.data.isLoggedIn);
            props.LoginStatus(loggedIn);
          } else {
            props.LoginStatus(!loggedIn);
            navigate('/Login')
          }
        })
        .catch(err => console.log(err))
      },[props, loggedIn, navigate])

      const property_id = useCallback(async ()=>{
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/approvals`)
        .then(res => {
            const record = res.data.records.filter((doc)=>(doc.propertyid === propertyId))
            setId(record[0]._id)
            let images = []
            for (let i = 0; i < record[0].images.length; i++) {
               images.push(record[0].images[i])
            }
            setImages(images)
        })
      },[propertyId]) 

      const profile = useCallback(async () => {
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/profile/${Id}`)
        .then(res => {
          if(res.data.status){
            const profile_doc = res.data.profile      
            if (profile_doc.data[0].requests === 'Pending'){
              setPropertyLocation(profile_doc.data[0].location)
              setPropertyArea(profile_doc.data[0].area)
              setPropertyType(profile_doc.data[0].property)
              setPhase(profile_doc.data[0].phase)
              setRooms(profile_doc.data[0].rooms)
              setFloor(profile_doc.data[0].floor)
              setCurrency(profile_doc.data[0].currency)
              setPrice(profile_doc.data[0].price)
              setZip(profile_doc.data[0].zip)
              setPropertyAddress(profile_doc.data[0].address)
              } 
          } 
        })
        .catch(err => console.log(err))
      },[Id])

      axios.defaults.withCredentials = true;
      useEffect(()=>{
        session();
        property_id();
        profile();
      },[session, property_id, profile])


    return(
        <React.Fragment>
        <div className="row">
        <div className="col-md-2">        
          <AdminSidebar/>
        </div>
        <div className="col-md-10">
      
      
        <div className="container mt-4" >
          <div className="card">
          <h1 className="card-header">
            <center>
              <div className="header-font">Pending Approval</div>
            </center>
          </h1>
            <div className="form-container">
                <form>
                <div className="card-body">
                <div className="col-md-12">
                <div className='row'>
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Particulars</th>
                            <th scope="col">Details</th>
                        </tr>
                        </thead>
                        <tbody className="table-group-divider">
                        <tr>
                            <td>Property ID</td>
                            <td>{propertyId}</td>
                        </tr>                        
                        <tr>
                            <td>Property Location</td>
                            <td>{propertyLocation}</td>
                        </tr>
                        <tr>
                            <td>Property Area</td>
                            <td>{propertyArea}</td>
                        </tr>
                        <tr>
                            <td>Property Type</td>
                            <td>{propertyType}</td>
                        </tr>
                        <tr>
                            <td>Phase</td>
                            <td>{phase}</td>
                        </tr>
                        <tr>
                            <td>Rooms</td>
                            <td>{rooms}</td>
                        </tr>
                        <tr>
                            <td>Floor</td>
                            <td>{floor}</td>
                        </tr>
                        <tr>
                            <td>Currency</td>
                            <td>{currency}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>{price}</td>
                        </tr>
                        <tr>
                            <td>Zip</td>
                            <td>{zip}</td>
                        </tr>
                        <tr>
                            <td>Property Address</td>
                            <td>{propertyAddress}</td>
                        </tr>
                        </tbody>
                    </table>


              {Images.length === 0? <></>:
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
                          <td align="center"><button onClick={(e)=>{
                                    e.preventDefault();
                                    if (currentPhotoIndex > 0) {
                                      setCurrentPhotoIndex(currentPhotoIndex - 1);
                                    }
                          }}><i className="fa fa-angle-double-left" style={{fontSize:"18px"}}></i></button></td>
                          <td align="center"><p style={{fontWeight:"lighter"}}>[{currentPhotoIndex+1}/{Images.length}]</p></td>
                          <td align="center"><button onClick={(e)=>{
                                    e.preventDefault();
                                    if (currentPhotoIndex < Images.length - 1) {
                                      setCurrentPhotoIndex(currentPhotoIndex + 1);
                                    }
                          }}><i className="fa fa-angle-double-right" style={{fontSize:"18px"}}></i></button></td>              
                      </tr>
                    </tbody>
                  </table>
              </div>
              }



                </div>
                <div className="col-md-3"></div>
                </div>  
                </div>
                </div>     
                </form>
            </div>
            </div>
        </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default Approvals;

