import {useState, useEffect} from 'react';
import '../App.css';
import axios from "axios";
import SimpleImageSlider from "react-simple-image-slider";
import { NavLink } from 'react-router-dom';

function Home(props) {
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

    axios.get("http://localhost:8000/api")
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


    },[props, loggedIn])

    return(
        <>
        {dataExists && (
            <div className="row">
            <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className='container mt-2'>
                        <div className="row">  
                            {profiles.map((profile, index)=>{ 
                            return (
                            <div className="col-sm-6" key={index}>
                                <div className="card mt-3">
                                <div className="card-body">
                                    <div className='slider'>
                                    <SimpleImageSlider
                                        width={500}
                                        height={300}
                                        images={                  
                                        profile.images.map((image)=>{
                                        return ({url: image});
                                        })}
                                        showBullets={true}
                                        showNavs={false}
                                        autoPlay={true}
                                        loop={true}
                                        />
                                        </div>
                                    <h5 className="card-title mt-3">{profile.property}</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Area: {profile.area} Sq. ft</li>
                                        <li className="list-group-item">Rooms: {profile.rooms}</li>
                                        <li className="list-group-item">Locality: {profile.location}</li>
                                    </ul>
                                    <NavLink exact="true" to={`/Checkout/${profile.propertyid}`}>
                                        <a href="#Go" className="btn btn-primary mt-3">Go</a>
                                    </NavLink>
                                </div>
                                </div>
                            </div>)
                            })}
                            
                        </div>
                    </div>
                </div>
            <div className="col-md-1"></div>
            </div> )}
        </>
    )
}

export default Home;