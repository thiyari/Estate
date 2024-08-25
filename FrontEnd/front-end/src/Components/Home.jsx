import {useState, useEffect, useCallback} from 'react';
import '../App.css';
import axios from "axios";
import SimpleImageSlider from "react-simple-image-slider";
import { NavLink } from 'react-router-dom';
import { properties } from '../properties.js'

function Home(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [dataExists, setDataExists] = useState(false)
    const [profiles, setProfiles] = useState([{}])

    const session = useCallback(async() =>{
        await axios.get(properties.REACT_APP_SERVER_URI+'/api/session')
        .then(res => {
        if(res.data.valid){
            setLoggedIn(res.data.isLoggedIn);
            props.LoginStatus(loggedIn);
        } else {
            props.LoginStatus(!loggedIn);
        }
        })
        .catch(err => console.log(err))

    },[props, loggedIn]);

    const records = useCallback(async()=>{
        await axios.get(properties.REACT_APP_SERVER_URI+'/api')
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
    },[]);

    axios.defaults.withCredentials = true;
    useEffect(()=>{
      session();
      records();
    },[session, records])

    return(
        <>
        <div className="banner border">
            <div className="logo-content">
            <img className="img-fluid" src={require("./Logo.png")} height={100} width={250} alt="logo"/>
                <div style={{padding: "10px 100px 10px 50px"}}>
                    <h2 className="banner-title">Welcome to Live Services</h2>
                    <p className="banner-desc">Sell, Rent & Lease your Properties on Live with us</p>
                    <p align="center">Sign Up now and get connected with us</p> 
                    <form className="d-flex" action='/Register'>
                        <button className="btn-signup" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
        {dataExists && (<>

        <div className="row">
            <div className="col-md-1"></div>
                <div className="col-md-10">
                <div className="row">  
            <article className="article">
                    <div className='container mt-2'>
                        <div className="row">  
                            {profiles.map((profile, index)=>{ 
                            return (
                            <div className="col-sm-6" key={index}>
                                <div className="card mt-3">
                                <div className="card-body">
                                    <div className='slider'>
                                        {profile.images.length === 0? <></>: 
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
                                        />}
                                        </div>
                                    <h5 className="card-title mt-3">{profile.property} for {profile.propertymode}</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Area: {profile.area}{" "}{profile.areatype}</li>
                                        <li className="list-group-item">Rooms: {profile.rooms}</li>
                                        <li className="list-group-item">Locality: {profile.location}</li>
                                    </ul>
                                    <NavLink exact="true" to={`/Checkout/${profile.propertyid}`} className="btn btn-primary mt-3">Go
                                    </NavLink>
                                </div>
                                </div>
                            </div>)
                            })}
                            
                        </div>
                    </div>
                    </article>
                </div>
            <div className="col-md-1"></div>
            </div>
            </div>  
</>
)}
        </>
    )
}

export default Home;