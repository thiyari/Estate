import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';

import './App.css';
import { PiUploadSimpleBold } from "react-icons/pi";
import {useState, useEffect} from 'react';


function App() {

  const [img,setImg] = useState("")
  const [allImage,setAllImage] = useState([])

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
    const file = e.target.files[0]
    const image = await imagebased64(file)
    console.log(image)
    setImg(image)
  }

  const fetchImage = async()=>{
    const res = await fetch("http://localhost:8000/")
    const data = await res.json()
    setAllImage(data.data)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(img){
      const res = await fetch("http://localhost:8000/user/upload",{
        method: "POST",
        headers:{
          "content-type":"application/json"
        },
        body: JSON.stringify({img:img})
      })
      const data = await res.json()
      console.log(data)
      if(data.status){
        alert(data.message)
        setImg('')
        fetchImage()
      }
    }

  }

  useEffect(()=>{
    fetchImage()
  },[])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element = {<Home/>} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/login" element = {<Login/>} />

        </Routes>
      </BrowserRouter>
      <div className='imageContainer'>
        <form>
          <label htmlFor='uploadImage'>
            <div className='uploadBox'>
              <input type='file' id='uploadImage' onChange={handleUploadImage}/>
              { img ? <img src={img} alt=''/>:<PiUploadSimpleBold/>}
            </div>
          </label>
          <div className='btn'>
            <button onClick={handleSubmit}>upload</button>
          </div>
        </form>
        <div className='allimage'>
          {
            allImage.map(e1 =>{
              return <img src={e1.image} width={"250px"} height={"180px"} alt=''/>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
