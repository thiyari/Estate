import {useState, useEffect, useCallback} from 'react';
import '../App.css';
import axios from "axios";
import { properties } from '../properties.js';

function AboutUs(props) {

    const [loggedIn, setLoggedIn] = useState(false)

    const session = useCallback(async ()=>{
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
    },[props, loggedIn])

    axios.defaults.withCredentials = true;
    useEffect(()=>{
      session();
    },[session])

    return(
      <div className="container">
      <div className="row">
      <div className="col-md-1"></div>
          <div className="col-md-10">
          <div className="card form-container mt-4">
              <h1 className="card-header">
                  <center>
                    <div className="header-font">About Us</div>
                  </center>
              </h1>
              <div className="card-body">
              <div className='row'>
              <div className='col-md-1'></div>
              <div className='col-md-10'>
              Our Organization offers the comprehensive capabilities and deep industry knowledge necessary to help you in Real Estate. Our Consultancy is Hyderabad's leading service provider. 
              We believe that customer satisfaction is the ultimate. Hence we are always driven towards providing customer-oriented service specializing in Home Loans and Real Estate Sectors. 
              Our Organization is managed by a team of dynamic professionals who frequently take care of customer’s happiness, either giving the attention of customers towards business dealing or documentation of work.    
              <br></br>
              <br></br>
              Want to experience the expertise of our Organization for yourself?
              <br></br>
              <br></br>
              Give us a call today and let’s discuss what we can do for you.
              <br></br>
              <br></br>
              <div align="center">
              <img alt="images" className="img-fluid" width={500} height={300} src="https://www.mckissock.com/wp-content/uploads/2016/11/GettyImages-1151832961.jpg"/>
              </div>
              <br></br>
              <h5>OUR MISSION</h5>
              <br></br>
              The Mission of this Organization is to provide excellent service and expertise in Home Loan and Real Estate in and around Telangana & Andhra Pradesh.
              <br></br>
              <br></br>
              <h5>OUR VISION</h5>
              <br></br>
              The Vision of this Organization is to reduce threats and improve the returns on Home Loan and real estate investments and providing the best services at the best location to our customers.
              </div>
              </div>
              <div className='col-md-1'></div>
            </div>
          </div>
        </div>
      <div className="col-md-1"></div>
  </div>
  </div>
    )
}

export default AboutUs;