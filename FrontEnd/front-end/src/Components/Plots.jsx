import {useState, useEffect} from 'react';
import '../App.css';
import axios from "axios";

function Plots(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [dataExists, setDataExists] = useState(false)
    const [profiles, setProfiles] = useState([{}])

    axios.defaults.withCredentials = true;
    useEffect(()=>{
      axios.get('http://localhost:8000/api/session')
      .then(res => {
        if(res.data.valid){
          setLoggedIn(res.data.isLoggedIn);
          props.LoginStatus(loggedIn);
        } else {
          props.LoginStatus(!loggedIn);
        }
      })
      .catch(err => console.log(err))

    axios.get("http://localhost:8000/api/plots")
        .then(res => {
            let profiles_doc = res.data.records
            console.log(profiles_doc)
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
        
      

    },[props, loggedIn])

    return(
        <>
        {dataExists && (
            <div className="row">
            <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className='container mt-4'>
                        <div className="row">  
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                           { profiles.map((profile,index)=>{
                                return(
<                               div className="card mb-4" key={index}>
                                    <div className="row g-0">
                                        <div className="col-md-8 ">
                                        <img style={{padding: '10px'}} src="https://img.freepik.com/free-psd/blank-wall-psd-japandi-living-room-interior_53876-109284.jpg" className="img-fluid" alt="..."/>
                                        </div>
                                        <div className="col-md-4">
                                        <div className="card-body mt-2">
                                            <h5 className="card-title">{profile.property}</h5>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">Property ID: {profile.propertyid}</li>
                                                <li className="list-group-item">Area: {profile.area} Sq. ft</li>
                                                <li className="list-group-item">Phase: {profile.phase}</li>
                                                <li className="list-group-item">Locality: {profile.location}</li>
                                                <li className="list-group-item">Price: {profile.currency}{" "}{profile.price}</li>
                                            </ul>
                                            <a href="#go" className="btn btn-primary mt-2">Check Out</a>                                        </div>
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
            <div className="col-md-2"></div>
            </div> )}
        </>
    )
}

export default Plots;