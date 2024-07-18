import React from 'react';
import Sidebar from './Sidebar/Sidebar';

function Properties(){

    return(
<React.Fragment>
  <div className="row">
  <div className="col-md-2">        
    <Sidebar/>
  </div>
  <div className="col-md-10">


  <div className="container mt-4" >
    <div className="card">
    <h1 className="card-header">
      <center>
        <div className="header-font">Property Details</div>
      </center>
    </h1>
			<div className="form-container">
        <div className="card-body">
    <form>
      <div className="row">
      <div className="col-md-12">
      <div className='row'>
      <div className="col-sm-4"></div>
      <div className="col-sm-4">
      


        <div align="center">
          <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </div>

          </div> 
          </div> 
          <div className="col-sm-4"></div>

        </div>
        </div>
        </form>
      </div>
      </div>

      <div className="card-footer text-muted">
            <p>
              Already registered?<br />
              <span className="line">
              <a href="/Login">Sign In</a>
              </span>
            </p>      
      </div>
      </div>
      </div>
    </div>
</div>
</React.Fragment>
    )
}

export default Properties;



