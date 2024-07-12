
import {useState, useEffect} from 'react';
import '../App.css';

function Home() {
   const [allImage,setAllImage] = useState([])
   const fetchImage = async()=>{
      const res = await fetch("http://localhost:8000")
      const doc_res = await res.json()
      const img_data = doc_res.data[doc_res.data.length-1].images
      setAllImage(img_data)
    }

    useEffect(()=>{
       fetchImage()
     },[])
     
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