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
            <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className='container mt-4'>
                        <div className="row">  

                            <div className="card mb-4" >
                                <div className="row g-0">
                                    <div className="col-md-5 mt-3 mb-3">
                                    <img src="https://img.freepik.com/free-psd/blank-wall-psd-japandi-living-room-interior_53876-109284.jpg" className="img-fluid" alt="..."/>
                                    </div>
                                    <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                    </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card" >
                                <div className="row g-0">
                                    <div className="col-md-5 mt-3 mb-3">
                                    <img src="https://img.freepik.com/free-psd/blank-wall-psd-japandi-living-room-interior_53876-109284.jpg" className="img-fluid" alt="..."/>
                                    </div>
                                    <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                    </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            <div className="col-md-1"></div>
            </div> )}
        </>
    )
}

export default Plots;