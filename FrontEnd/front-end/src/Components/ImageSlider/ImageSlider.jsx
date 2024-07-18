import React, { useEffect, useState } from 'react';
import './ImageSlider.css';
import axios from 'axios';
function ImageSlider(props) {
  
  const imgs=[
    {id:0,value:"https://wallpaperaccess.com/full/2637581.jpg"},
    {id:1,value:"https://png.pngtree.com/thumb_back/fw800/background/20230817/pngtree-lotus-flower-jpg-pink-lotus-flower-image_13023952.jpg"},
    {id:2,value:"https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-landscape-jpg-wallpapers-free-download-image_2573540.jpg"},
  ]
  const [wordData,setWordData]=useState(imgs[0])
  const [Images,setImages] = useState([])

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/profile/${props.Id}`)
        .then(res => {
        if(res.data.status){
            const profile_doc = res.data.profile          
            setImages(profile_doc.data[0].images)
        } 
        })
        .catch(err => console.log(err))
    },[props])

  console.log(Images)

  const handleClick=(index)=>{
    console.log(index)
    const wordSlider=imgs[index];
    setWordData(wordSlider)
  }

  return (
    <div className="main">
      <img alt="" src={wordData.value} height="300" width="500" /> 
      <div className='flex_row'>
        {imgs.map((data,i)=>
        <div className="thumbnail" key={i} >
          <img alt="" className={wordData.id===i?"clicked":""} src={data.value} onClick={()=>handleClick(i)} height="70" width="100" />
        </div>
        )}
      </div>
    </div>
  );
}

export default ImageSlider;