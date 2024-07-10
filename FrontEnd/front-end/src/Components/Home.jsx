import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home(){
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:8000/user')
    .then(res => {
      if(res.data.valid){
        setEmail(res.data.email);
      } else {
        navigate('/Login')
      }
    })
    .catch(err => console.log(err))
  },[navigate])
  return (
    <React.Fragment>
      <div><h1>Welcome {email}</h1></div>
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