import React, {useState, useEffect, useCallback, useContext, createContext} from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import axios from 'axios'

const roomsList = [
  { value: '', label: 'Select Rooms'},
  { value: '1 BHK', label: '1 BHK' },
  { value: '2 BHK', label: '2 BHK' },
  { value: '3 BHK', label: '3 BHK' },
  { value: '1B + 2HK', label: '1B + 2HK'},
  { value: '1B + 3HK', label: '1B + 3HK'},
  { value: '2B + 2HK', label: '2B + 2HK'},
  { value: '2B + 3HK', label: '2B + 3HK'},
  { value: '3B + 2HK', label: '3B + 2HK'},
  { value: '3B + 3HK', label: '3B + 3HK'}
];

const floorList = [
  { value: '', label: 'Select Floor'},
  { value: '0', label: 'Not Available'},
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
  { value: '24', label: '24' },
  { value: '25', label: '25' },
  { value: '26', label: '26' },
  { value: '27', label: '27' },
  { value: '28', label: '28' },
  { value: '29', label: '29' },
  { value: '30', label: '30' },
  { value: '31', label: '31' },
  { value: '32', label: '32' },
  { value: '33', label: '33' },
  { value: '34', label: '34' },
  { value: '35', label: '35' },
  { value: '36', label: '36' },
  { value: '37', label: '37' },
  { value: '38', label: '38' },
  { value: '39', label: '39' },
  { value: '40', label: '40' },
  { value: '41', label: '41' },
  { value: '42', label: '42' },
  { value: '43', label: '43' },
  { value: '44', label: '44' },
  { value: '45', label: '45' },
  { value: '46', label: '46' },
  { value: '47', label: '47' },
  { value: '48', label: '48' },
  { value: '49', label: '49' },
  { value: '50', label: '50' },
  { value: '51', label: '51' },
  { value: '52', label: '52' },
  { value: '53', label: '53' },
  { value: '54', label: '54' },
  { value: '55', label: '55' },
  { value: '56', label: '56' },
  { value: '57', label: '57' },
  { value: '58', label: '58' },
  { value: '59', label: '59' },
  { value: '60', label: '60' },
  { value: '61', label: '61' },
  { value: '62', label: '62' },
  { value: '63', label: '63' },
  { value: '64', label: '64' },
  { value: '65', label: '65' },
  { value: '66', label: '66' },
  { value: '67', label: '67' },
  { value: '68', label: '68' },
  { value: '69', label: '69' },
  { value: '70', label: '70' },
  { value: '71', label: '71' },
  { value: '72', label: '72' },
  { value: '73', label: '73' },
  { value: '74', label: '74' },
  { value: '75', label: '75' },
  { value: '76', label: '76' },
  { value: '77', label: '77' },
  { value: '78', label: '78' },
  { value: '79', label: '79' },
  { value: '80', label: '80' },
  { value: '81', label: '81' },
  { value: '82', label: '82' },
  { value: '83', label: '83' },
  { value: '84', label: '84' },
  { value: '85', label: '85' },
  { value: '86', label: '86' },
  { value: '87', label: '87' },
  { value: '88', label: '88' },
  { value: '89', label: '89' },
  { value: '90', label: '90' },
  { value: '91', label: '91' },
  { value: '92', label: '92' },
  { value: '93', label: '93' },
  { value: '94', label: '94' },
  { value: '95', label: '95' },
  { value: '96', label: '96' },
  { value: '97', label: '97' },
  { value: '98', label: '98' },
  { value: '99', label: '99' },
  { value: '100', label: '100' },
  { value: '101', label: '101' },
  { value: '102', label: '102' },
  { value: '103', label: '103' },
  { value: '104', label: '104' },
  { value: '105', label: '105' },
  { value: '106', label: '106' },
  { value: '107', label: '107' },
  { value: '108', label: '108' },
];

const propertyList = [
  { value: '', label: 'Select Property Type'},
  { value: 'Open Plot', label: 'Open Plot'},
  { value: 'Independent House', label: 'Independent House'},
  { value: 'Duplex Home', label: 'Duplex Home'},
  { value: 'Flat', label: 'Flat'},
  { value: 'Commercial', label: 'Commerial'},
]

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
    const [filters, setFilters] = useState({
      property:"",
      phase:"",
      rooms:"",
      floor: "",
      currency:""
    });
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
          (filters.property === "" || profile.property === filters.property) &&
          (filters.phase === "" || profile.phase === filters.phase) &&
          (filters.rooms === "" || profile.rooms === filters.rooms) &&
          (filters.floor === "" || profile.floor === filters.floor) &&
          (filters.currency === "" || profile.currency === filters.currency)
      );
    });

const FilterControls = () => {
    const { filters, handleFilterChange } = useContext(FilterContext);
    return (
      <form>
        <table>
          <tr>
            <td>
                <select 
                  className="form-select" 
                  title="property"
                  name="property"
                  value={filters.property}
                  onChange={handleFilterChange}
                    >
                    {propertyList.map((option,index) => (
                      <option value={option.value} key={index}>{option.label}</option>
                    ))}
                </select>
            </td>
            <td>
                <select className="form-select" 
                  title="phase"
                  name="phase"
                  value={filters.phase}
                  onChange={handleFilterChange}
                    >
                    {phaseList.map((option,index) => (
                      <option value={option.value} key={index}>{option.label}</option>
                    ))}
                </select>
            </td>
            <td>
                <select 
                    className="form-select" 
                    title="rooms"
                    name="rooms"
                    value={filters.rooms}
                    onChange={handleFilterChange}
                      >
                      {roomsList.map((option,index) => (
                        <option value={option.value} key={index}>{option.label}</option>
                      ))}
                </select>
            </td>
            <td>
                <select 
                    className="form-select" 
                    title="floor"
                    name="floor"
                    value={filters.floor}
                    onChange={handleFilterChange}
                      >
                      {floorList.map((option, index) => (
                        <option value={option.value} key={index}>{option.label}</option>
                      ))}
                </select>
            </td>
            <td>
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
            </td>
          </tr>
      </table>
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