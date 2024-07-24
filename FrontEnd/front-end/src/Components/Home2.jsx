
import {useState, useEffect} from 'react';
import '../App.css';
import axios from "axios";

function Home2(props) {
  const [checkImages, setCheckImages] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [allImage,setAllImage] = useState([])
   const fetchImage = async()=>{
      const res = await fetch("http://localhost:8000")
      const doc_res = await res.json()
      console.log(doc_res)
      if (!Object.keys(doc_res.data).length) { // Check for no data or images in the response
        setCheckImages(false)
      } else {
        const img_data = doc_res.data[doc_res.data.length-1].images
        setAllImage(img_data)      
        setCheckImages(true)
      }
    }

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
    
       fetchImage()
     },[props, loggedIn])

     
     
    return (
     <div>
        <img src='https://media.istockphoto.com/id/1471683196/vector/black-wavy-lines-isolated-on-white-abstract-background-design.jpg?s=612x612&w=0&k=20&c=OiEcsV3iKnIS96d2fHbVXQS-aWBeWaTfx5o_fY3Q_Rg=' height="150" width="100%" alt="banner"></img>
        <div className='allimage'>
          { checkImages &&
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

  export default Home2;