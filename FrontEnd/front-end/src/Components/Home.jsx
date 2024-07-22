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
        <div className="row">
        
        <div className="col-md-6">
            <div className="container card mt-4" style={{width: "35rem"}}>
            <img className="card-img-top mt-3" src="https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?cs=srgb&dl=pexels-fotoaibe-1669799.jpg&fm=jpg" alt="Card images cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#go" className="btn btn-primary">Go</a>
                </div>
            </div>
        </div>

        <div className="col-md-6">
            <div className="container card mt-4" style={{width: "35rem"}}>
            <img className="card-img-top mt-3" src="https://img.freepik.com/free-psd/blank-wall-psd-japandi-living-room-interior_53876-109284.jpg" alt="Card images cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#go" className="btn btn-primary">Go</a>
                </div>
            </div>
        </div>

        <div className="col-md-6">
            <div className="container card mt-4" style={{width: "35rem"}}>
            <img className="card-img-top mt-3" src="https://img.freepik.com/free-psd/blank-wall-psd-japandi-living-room-interior_53876-109284.jpg" alt="Card images cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#go" className="btn btn-primary">Go</a>
                </div>
            </div>
        </div>


        <div className="col-md-6">
            <div className="container card mt-4" style={{width: "35rem"}}>
            <img className="card-img-top mt-3" src="https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?cs=srgb&dl=pexels-fotoaibe-1669799.jpg&fm=jpg" alt="Card images cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#go" className="btn btn-primary">Go</a>
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