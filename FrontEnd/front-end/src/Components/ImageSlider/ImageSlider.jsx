import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

function ImageSlider(props) {

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [Images,setImages] = useState([])
  const [uploadToggle,setUploadToggle] = useState(false)
  const [uploadImages, setUploadImages] = useState([])
  const [approved, setApproved] = useState(false)

  const profile = useCallback(async ()=>{
    await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/profile/${props.Id}`)
        .then(res => {
        if(res.data.status){
            const profile_doc = res.data.profile  
            if (profile_doc.data[0].requests === 'Approved'){    
              setImages(profile_doc.data[0].images)
              setApproved(true)
            }
            else { setApproved(false) }
        } 
        })
        .catch(err => console.log(err))
  },[props])

  useEffect(()=>{
    profile();
    },[profile])

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
          await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/profile/upload/${props.Id}`, JSON.stringify({
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
            window.location.reload();
          } catch (err) {
            alert(err);
          }
      }; 

    const handleDelete = async (e) => {
        e.preventDefault()
        if(window.confirm('Are you sure deleting this current image!')){
        try{
          await axios.delete(`${process.env.REACT_APP_SERVER_URI}/api/profile/deleteimage/${props.Id}`, 
            { data: JSON.stringify({
              image: Images[currentPhotoIndex],
              }), headers: { "Content-Type":"application/json" } }
            )
            alert("Image Deleted Successfully");
            window.location.reload();
          } catch (err) {
            alert(err);
          }
        }
      };


  return (
<>
{ approved && (
<div className ="table-responsive-md">
<table className ="table">
  <thead>
    <tr>
      <th scope="col" colSpan={5}>Images</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colSpan={5}>
            <img className="img-fluid" src={Images[currentPhotoIndex]} alt="Current images" width="500px" height="300px"/>
      </td>
    </tr>
    <tr>
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
    </tr>
  </tbody>
</table>
</div>
  )}
  </>
  );
}

export default ImageSlider;