import {useState, useEffect, useCallback} from 'react';
import '../App.css';
import axios from 'axios'

function Search(props) {

    const [loggedIn, setLoggedIn] = useState(false)
    const session = useCallback(async ()=>{
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/session`)
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
    },[session]);

return(
<>
<div className="container mt-4">
      <div className="row">
      <div className="col-md-1"></div>
          <div className="col-md-10">
              <div className ="table-responsive-md">
                  <table className ="table table-striped">
                    <thead>
                      <tr>
                        <th>##</th>
                        <th>##</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      <tr>
                        <td align="center"></td>
                        <td align="center"></td>
                      </tr>
                      <tr>
                        <td align="center"></td>
                        <td align="center"></td>
                      </tr>
                      <tr>
                        <td align="center"></td>
                        <td align="center"></td>
                      </tr>
                    </tbody>
                  </table>
              </div>                       
              </div>
              <div className='col-md-1'></div>
              </div>
              </div>
</>
)}

export default Search;