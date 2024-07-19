import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    const handleDelete = (e) => {
        e.preventDefault()

      };

    const handleUpload = (e) => {
        e.preventDefault()

      };

  return (

<>
<table class="table" style={{width:"100%"}}>
  <thead>
    <tr>
      <th scope="col">Images</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
          <div>
            <img src={Images[currentPhotoIndex]} alt="Current images" width="500px" height="300px"/>
          </div>
      </td>
    </tr>
    <tr>
      <th scope="col">
        <td><button onClick={handlePrevClick}><i class="fa fa-angle-double-left" style={{fontSize:"18px"}}></i></button></td>
        <td><button onClick={handleNextClick}><i class="fa fa-angle-double-right" style={{fontSize:"18px"}}></i></button></td>
        <td><p style={{fontWeight:"lighter"}}>Picture [{currentPhotoIndex+1}/{Images.length}]</p></td>
        <td><button onClick={handleUpload}><i class="fa fa-upload" aria-hidden="true"></i></button></td>
        <td><button onClick={handleDelete}><i class="fas fa-trash-alt"></i></button></td>
      </th>
    </tr>
  </tbody>
</table>
</>
  );
}

export default ImageSlider;