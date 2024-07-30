import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function AdminProfile(props){
    const [loggedIn, setLoggedIn] = useState(false)
    const [Id, setId] = useState('')
    const [user, setUser] = useState('')
    const navigate = useNavigate()

    const session = useCallback(async () =>{
      await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/session`)
      .then(res => {
        if(res.data.valid){
          setUser(res.data.username);
          setId(res.data.id);
          setLoggedIn(res.data.isLoggedIn);
          props.LoginStatus(loggedIn);
        } else {
          props.LoginStatus(!loggedIn);
          navigate('/Login')
        }
      })
      .catch(err => console.log(err))
    },[props, loggedIn, navigate])


    axios.defaults.withCredentials = true;
    useEffect(()=>{
      session();
    },[session])

    return(
        <>Welcome to Admin Page {user} and id: {Id}</>
    )
}

export default AdminProfile;