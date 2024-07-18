import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GiNextButton, GiPreviousButton } from "react-icons/gi";


function ImageSlider(props) {

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
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

    const handlePrevClick = (e) => {
        e.preventDefault()
        if (currentPhotoIndex > 0) {
          setCurrentPhotoIndex(currentPhotoIndex - 1);
        }
      };
      
    const handleNextClick = (e) => {
        e.preventDefault()
        if (currentPhotoIndex < Images.length - 1) {
          setCurrentPhotoIndex(currentPhotoIndex + 1);
        }
      };

  return (
    <div>
    <button onClick={handlePrevClick}><GiPreviousButton /></button>
    <button onClick={handleNextClick}><GiNextButton /></button>
    <img src={Images[currentPhotoIndex]} alt="Current images" width="500px" height="300px"/>
  </div>
  );
}

export default ImageSlider;