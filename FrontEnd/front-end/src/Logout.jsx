import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    axios.post(`${process.env.REACT_APP_SERVER_URI}/api/logout`)
    .then(res => {
      if(res.data.valid){
        alert("Logout Successful")
        navigate('/Login')
      } else {
        alert("Logout Failed")
      }
    })
    .catch(err => console.log(err))
};
export default Logout;