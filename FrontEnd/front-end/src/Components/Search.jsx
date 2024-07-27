import {useState, useEffect, useCallback} from 'react';
import '../App.css';
import axios from 'axios'

function Search(props) {

    const [loggedIn, setLoggedIn] = useState(false)
    const [dataExists, setDataExists] = useState(false)
    const [profiles, setProfiles] = useState([{}])

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


    const records = useCallback(async()=>{
        await axios.get(`${process.env.REACT_APP_SERVER_URI}/api`)
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
    },[session, records]);

return(
    <>
{dataExists && (
    
<div className="container mt-4">
      <div className="row">
      <div className="col-md-1"></div>
          <div className="col-md-10">
              <div className ="table-responsive-md">
                  <table className ="table table-striped">
                    <thead align="center">
                      <tr>
                        <th>Property ID</th>
                        <th>Property Type</th>
                        <th>Area</th>
                        <th>Phase</th>
                        <th>Rooms</th>
                        <th>Floor</th>
                        <th>Location</th>
                        <th>Currency</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider" align="center">
                    {profiles.map((profile, index)=>{ 
                            return (<>
                      <tr>
                        <td>{profile.propertyid}</td>
                        <td>{profile.property}</td>
                        <td>{profile.area}</td>
                        <td>{profile.phase}</td>
                        <td>{profile.rooms}</td>
                        <td>{profile.floor}</td>
                        <td>{profile.location}</td>
                        <td>{profile.currency}</td>
                        <td>{profile.price}</td>
                      </tr>
                            </>)}
                    )}
                    </tbody>
                  </table>
              </div>                       
              </div>
              <div className='col-md-1'></div>
              </div>
              </div>
            
            )}
            </>
)}

export default Search;