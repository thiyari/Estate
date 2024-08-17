import {useState, useEffect, useCallback} from 'react';
import '../App.css';
import axios from "axios";
import SimpleImageSlider from "react-simple-image-slider";
import { NavLink } from 'react-router-dom';

function Houses(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [dataExists, setDataExists] = useState(false)
    const [profiles, setProfiles] = useState([{}])

    const session = useCallback(async ()=>{
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/session`)
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


    const records = useCallback(async () =>{
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/houses`)
        .then(res => {
            let profiles_doc = res.data.records
            if (!Object.keys(profiles_doc).length) { // Check for empty data in the response
                setDataExists(false)
            } else {
                let profiles_list = []
                for (let i = 0; i < profiles_doc.length;  i++) {
                    profiles_list.push(profiles_doc[i])
                }
                setProfiles(profiles_list)
                setDataExists(true)
            }
        })
    },[])


    axios.defaults.withCredentials = true;
    useEffect(()=>{
          session();
          records();
    },[session, records])

    return(
        <>
        {dataExists && (
            <div className="row">
            <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className='container mt-4'>
                        <div className="row">  
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                           { profiles.map((profile,index)=>{
                                return(
<                               div className="card mb-4" key={index}>
                                    <div className="row g-0">
                                        <div className="col-md-8">
                                        <div className='slider'>
                                        {profile.images.length === 0? <div>No Images to display</div>:
                                            <SimpleImageSlider
                                                width={610}
                                                height={400}
                                                images={                  
                                                profile.images.map((image)=>{
                                                return ({url: image});
                                                })}
                                                showBullets={true}
                                                showNavs={true}
                                                autoPlay={false}
                                                loop={true}
                                                />}
                                        </div>
                                        </div>
                                        <div className="col-md-4">
                                        <div className="card-body">
                                            <h5 className="card-title">{profile.property} for {profile.propertymode}</h5>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">Property ID: {profile.propertyid}</li>
                                                <li className="list-group-item">Area: {profile.area}{" "}{profile.areatype}</li>
                                                <li className="list-group-item">Phase: {profile.phase}</li>
                                                <li className="list-group-item">Rooms: {profile.rooms}</li>
                                                <li className="list-group-item">Floor: {profile.floor}</li>
                                                <li className="list-group-item">Locality: {profile.location}</li>
                                                <li className="list-group-item">Price: {profile.currency}{" "}{profile.price+profile.commission}</li>
                                            </ul>
                                            <NavLink exact="true" to={`/Checkout/${profile.propertyid}`} className="btn btn-primary mt-2">Check Out
                                            </NavLink>                                        
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                            
                        </div>
                        </div>
                        <div className='col-sm-1'></div>
                    </div>
                </div>
            <div className="col-md-1"></div>
            </div> )}
        </>
    )
}

export default Houses;