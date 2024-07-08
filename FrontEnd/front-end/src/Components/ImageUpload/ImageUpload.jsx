import { PiUploadSimpleBold } from "react-icons/pi";
import SimpleImageSlider from "react-simple-image-slider";
import './ImageUpload.css'

function ImageUpload(props){

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
    
<div className='imageContainer'>
<label htmlFor='uploadImage'>
  <div className='uploadBox'>
    <input type='file' multiple accept="image/*" id='uploadImage' onChange={handleUploadImage}/>
    { props.img.length === 0 ? <PiUploadSimpleBold/> :
            <SimpleImageSlider
            width={700}
            height={400}
            images={                  
              props.img.map((image)=>{
              return ({url: image});
            })}
            showBullets={true}
            showNavs={true}
            autoPlay={true}
            loop={true}
            />
    }
  </div>
</label>
</div>
  );
}

export default ImageUpload;
