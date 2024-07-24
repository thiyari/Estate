import {useState, useEffect, useCallback} from 'react';
import '../App.css';
import axios from "axios";
import { useParams } from "react-router-dom";

function Checkout(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const { propertyid } = useParams()

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
          let profiles_doc = res.data.records
          console.log(profiles_doc)
      })
    },[propertyid])    

    axios.defaults.withCredentials = true;
    useEffect(()=>{
      session();
      property_id();
    },[session, property_id])




    return(
        <div className="row">
            <div className="col-md-1"></div>
                <div className="col-md-10"></div>
                <div className='container mt-2'>
                <div>Property Id: {propertyid}</div>
                </div>
            <div className="col-md-1"></div>
        </div>
    )
}

export default Checkout;