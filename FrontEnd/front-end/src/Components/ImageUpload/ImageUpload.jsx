import { PiUploadSimpleBold } from "react-icons/pi";
import { useState } from "react";
import './ImageUpload.css'

function ImageUpload(props){

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const imagebased64 = async (file)=>{
    const reader = new FileReader()
    await reader.readAsDataURL(file)
    const data = new Promise((resolve,reject)=>{
      reader.onload = () => resolve(reader.result)
      reader.onerror = (err) => reject(err)
    })
    return data
  }

  const handleUploadImage = async(e)=>{
    let images = []
    for (let i = 0; i < e.target.files.length; i++) {
       images.push(await imagebased64(e.target.files[i]))
    }
    props.onSetImg(images);
  }

  return(
    
<div className="imageContainer">
<label htmlFor='uploadImage'>
  <div className='uploadBox'>
    <input type='file' multiple accept="image/*" id='uploadImage' onChange={handleUploadImage}/>
    { props.img.length === 0 ? <PiUploadSimpleBold/> :
   (   
   <div className ="table-responsive-md">
      <table className ="table">
        <thead>
          <tr>
            <th scope="col" colSpan={3} >Images</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}>
                  <img className="img-fluid" src={props.img[currentPhotoIndex]} alt="Current images" width="500px" height="300px"/>
            </td>
          </tr>
          <tr>
              <td align="center"><button onClick={(e)=>{
                        e.preventDefault();
                        if (currentPhotoIndex > 0) {
                          setCurrentPhotoIndex(currentPhotoIndex - 1);
                        }
              }}><i className="fa fa-angle-double-left" style={{fontSize:"18px"}}></i></button></td>
              <td align="center"><p style={{fontWeight:"lighter"}}>[{currentPhotoIndex+1}/{props.img.length}]</p></td>
              <td align="center"><button onClick={(e)=>{
                        e.preventDefault();
                        if (currentPhotoIndex < props.img.length - 1) {
                          setCurrentPhotoIndex(currentPhotoIndex + 1);
                        }
              }}><i className="fa fa-angle-double-right" style={{fontSize:"18px"}}></i></button></td>              
          </tr>
        </tbody>
      </table>
      </div>)

    }
  </div>
</label>
</div>
  );
}

export default ImageUpload;
