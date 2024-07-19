import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageSlider(props) {

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [Images,setImages] = useState([])
  const [uploadToggle,setUploadToggle] = useState(false)
  const [uploadImages, setUploadImages] = useState([])

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

    const imagebased64 = async (file)=>{
        const reader = new FileReader()
        await reader.readAsDataURL(file)
        const data = new Promise((resolve,reject)=>{
          reader.onload = () => resolve(reader.result)
          reader.onerror = (err) => reject(err)
        })
        return data
      }

    const handleUploadImage = async (e) => {
        e.preventDefault()
          let images = []
          for (let i = 0; i < e.target.files.length; i++) {
             images.push(await imagebased64(e.target.files[i]))
          }
        setUploadImages(images)
        setUploadToggle(true)  
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
          await axios.post(`http://localhost:8000/api/profile/upload/${props.Id}`, JSON.stringify({
            images: uploadImages,
            }),
            {
              headers:{
              "Content-Type":"application/json"
              }
            });
            alert("Images Updated Successfully");
            setUploadImages('')
            setUploadToggle(false)
          } catch (err) {
            alert(err);
          }
      }; 

    const handleDelete = (e) => {
        e.preventDefault()
        console.log(currentPhotoIndex)
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
        <td><p style={{fontWeight:"lighter"}}>[{currentPhotoIndex+1}/{Images.length}]</p></td>
        <td><button onClick={handleNextClick}><i className="fa fa-angle-double-right" style={{fontSize:"18px"}}></i></button></td>        
        <td>{ uploadToggle ? 
          <>
          <button type="submit" style={{paddingLeft: 80, paddingRight: 80, width: 25}} onClick={handleSubmit}><i class="fa fa-check" aria-hidden="true"></i></button>
          </>
        :
          <div>
            <label htmlFor='uploadImage'>
              <div style={{paddingLeft: 80,  paddingRight: 80, cursor: 'pointer'}}>
                <input type='file' multiple accept="image/*" id='uploadImage' onChange={handleUploadImage}/>
                <i className="fa fa-upload" aria-hidden="true"></i>
              </div>
            </label>
          </div>
          }
        </td>
        <td><button style={{width: 25}} onClick={handleDelete}><i className="fas fa-trash-alt"></i></button></td>
      </th>
    </tr>
  </tbody>
</table>
</div>
  );
}

export default ImageSlider;