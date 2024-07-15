
import {useState, useEffect} from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Home(props) {
   const [allImage,setAllImage] = useState([])
   const fetchImage = async()=>{
      const res = await fetch("http://localhost:8000")
      const doc_res = await res.json()
      const img_data = doc_res.data[doc_res.data.length-1].images
      setAllImage(img_data)
    }

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(()=>{
       axios.get('http://localhost:8000/user/session')
       .then(res => {
         if(res.data.valid){
           props.onLogin(true)
         } else {
           props.onLogin(false)
         }
       })
       .catch(err => console.log(err))
       fetchImage()
     },[navigate, props])

     
     
    return (
     <div>
        <h1>index</h1>
        <div className='allimage'>
          {
            allImage.map((image,index) =>{
              return (
                <div className={"row"} key={index}>
                <img src={image} width={"250px"} height={"180px"} alt={"image-" + index}/>
                </div> )
            })
          }
        </div> 
     </div>
    );
  }

  export default Home;