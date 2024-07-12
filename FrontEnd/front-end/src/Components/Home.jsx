import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home(){
  const [user, setUser] = useState('')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:8000/user/session')
    .then(res => {
      if(res.data.valid){
        setUser(res.data.username);
      } else {
        navigate('/Login')
      }
    })
    .catch(err => console.log(err))
  },[navigate])
  return (
    <React.Fragment>
      <div className='container'>
        <b>Welcome {user}</b>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
    </React.Fragment>
  )
}

export default Home;


/*
import {useState, useEffect} from 'react';
import '../App.css';

function Home() {
   const [allImage,setAllImage] = useState([])
   const fetchImage = async()=>{
      const res = await fetch("http://estateserver-vi8u.onrender.com")
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
  */