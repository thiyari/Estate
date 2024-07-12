import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile(){
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

export default Profile;