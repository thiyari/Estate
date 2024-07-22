import {useState, useEffect} from 'react';
import '../App.css';
import axios from "axios";

function Home(props) {
    const [loggedIn, setLoggedIn] = useState(false)

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
    
     },[props, loggedIn])

    return(
        <>
<div className="row">
<div className="col-md-1"></div>
    <div className="col-md-10">
        <div className='container mt-2'>
            <div className="row">  

                <div className="col-sm-6">
                    <div className="card mt-3">
                    <div className="card-body">
                        <img className='img-fluid' alt="img" src="https://img.freepik.com/free-psd/blank-wall-psd-japandi-living-room-interior_53876-109284.jpg" width="100%"/>
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#go" className="btn btn-primary">Go</a>
                    </div>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card mt-3">
                    <div className="card-body">
                    <   img className='img-fluid' alt="img" src="https://img.freepik.com/free-psd/blank-wall-psd-japandi-living-room-interior_53876-109284.jpg" width="100%"/>
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#go" className="btn btn-primary">Go</a>
                    </div>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card mt-3">
                    <div className="card-body">
                        <img className='img-fluid' alt="img" src="https://img.freepik.com/free-psd/blank-wall-psd-japandi-living-room-interior_53876-109284.jpg" width="100%"/>
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#go" className="btn btn-primary">Go</a>
                    </div>
                    </div>
                </div>

            </div>
    </div>
</div>
<div className="col-md-1"></div>
</div>
        </>
    )
}

export default Home;