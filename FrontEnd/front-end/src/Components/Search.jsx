import React, {useState, useEffect, useCallback, useContext, createContext} from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import axios from 'axios'


const currencyList = [
  { value: '', label: 'Select Currency'},
  { value: 'INR', label: 'INR'},
  { value: 'USD', label: 'USD'},
]


const phaseList = [
  { value: '', label: 'Select Phase'},
  { value: 'east', label: 'East' },
  { value: 'west', label: 'West' },
  { value: 'north', label: 'North' },
  { value: 'south', label: 'South' }
];


function Search(props) {
    const FilterContext = createContext();
    const [filters, setFilters] = useState({phase:"",currency:""});
    const [loggedIn, setLoggedIn] = useState(false)
    const [dataExists, setDataExists] = useState(false)
    const [profiles, setProfiles] = useState([{}])

    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value,
      }));
    };

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


    const filteredProfiles = profiles.filter((profile) => {
      return (
          (filters.phase === "" || profile.phase === filters.phase) &&
          (filters.currency === "" || profile.currency === filters.currency)
      );
    });

const FilterControls = () => {
    const { filters, handleFilterChange } = useContext(FilterContext);
    return (
      <form>
      <select 
      className="form-select" 
      title="phase"
      name="phase"
      value={filters.phase}
      onChange={handleFilterChange}
        >
        {phaseList.map((option,index) => (
          <option value={option.value} key={index}>{option.label}</option>
        ))}
      </select>
      
      <select 
      className="form-select" 
      title="currency"
      name="currency"
      value={filters.currency}
      onChange={handleFilterChange}
        >
        {currencyList.map((option,index) => (
          <option value={option.value} key={index}>{option.label}</option>
        ))}
      </select>
      </form>

    )
}
return(
  
    <>
{dataExists && (
    
<div className="container mt-4">
      <div className="row">
      <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="card">
            <h1 className="card-header mb-4"><center><div className="header-font">Search by Filters</div></center></h1>
            <div className="row">
              <div className='col-md-1'></div>
              <div className='col-md-10'>
            <FilterContext.Provider value={{filters, handleFilterChange}}>
              <div className ="table-responsive-md">
              <FilterControls />

                  <table className="table table-striped table-hover mt-4">
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
                        <th>Page</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider" align="center">
                    {filteredProfiles.map((profile, index)=>{ 
                            return (<>
                      <tr key={index}>
                        <td>{profile.propertyid}</td>
                        <td>{profile.property}</td>
                        <td>{profile.area}</td>
                        <td>{profile.phase}</td>
                        <td>{profile.rooms}</td>
                        <td>{profile.floor}</td>
                        <td>{profile.location}</td>
                        <td>{profile.currency}</td>
                        <td>{profile.price}</td>
                        <td><NavLink exact="true" to={`/Checkout/${profile.propertyid}`} target={'_blank'}>View
                        </NavLink></td>
                      </tr>
                            </>)}
                    )}
                    </tbody>
                  </table>
              </div>
              </FilterContext.Provider>             
                    </div>
                    <div className='col-md-1'></div>
                    </div>
              </div>
              <div className='col-md-1'></div>
              </div>
              </div>
              </div>
            
            )}
            </>
)}

export default Search;