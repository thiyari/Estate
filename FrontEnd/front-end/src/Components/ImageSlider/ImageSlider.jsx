import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import './ImageSlider.css'

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
        console.log(currentPhotoIndex)
      };

    const handleDelete = (e) => {
        e.preventDefault()
        console.log(currentPhotoIndex)
      };

    const handleUploadImage = (e) => {
        e.preventDefault()
      };

  return (

<div className ="table-responsive-md">
<table className ="table">
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
        <td><button onClick={handlePrevClick}><i className="fa fa-angle-double-left" style={{fontSize:"18px"}}></i></button></td>
        <td><button onClick={handleNextClick}><i className="fa fa-angle-double-right" style={{fontSize:"18px"}}></i></button></td>
        <td><p style={{fontWeight:"lighter"}}>Picture [{currentPhotoIndex+1}/{Images.length}]</p></td>
        <td>
          <div>
            <label htmlFor='uploadImage'>
              <div style={{paddingLeft:60, cursor: 'pointer'}}>
                <input  type='file' multiple accept="image/*" id='uploadImage' onChange={handleUploadImage}/>
                <i className="fa fa-upload" aria-hidden="true"></i>
              </div>
            </label>
          </div>
        </td>
        <td><button style={{paddingLeft:80}} onClick={handleDelete}><i className="fas fa-trash-alt"></i></button></td>
      </th>
    </tr>
  </tbody>
</table>
</div>
  );
}

export default ImageSlider;