import {useState, useEffect} from 'react';
import '../App.css';
import axios from "axios";
import SimpleImageSlider from "react-simple-image-slider";

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
            let profiles_doc = res.data.data
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
                                        showNavs={true}
                                        autoPlay={true}
                                        loop={true}
                                        />
                                        </div>
                                    <h5 className="card-title">{profile.firstname}</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Cras justo odio</li>
                                        <li class="list-group-item">Dapibus ac facilisis in</li>
                                        <li class="list-group-item">Vestibulum at eros</li>
                                    </ul>
                                    <a href="#go" className="btn btn-primary">Go</a>
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