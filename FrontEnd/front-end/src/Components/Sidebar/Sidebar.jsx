import React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from 'cdbreact';

const Sidebar = () => {

  const navigate = useNavigate()

  const logoutHandler = () => {
    axios.post('http://localhost:8000/user/logout')
    .then(res => {
      if(res.data.valid){
        alert("Logout Successful")
        navigate('/Login')
      } else {
        alert("Logout Failed")
      }
    })
    .catch(err => console.log(err))
  };

  return (
      <CDBSidebar textColor="#333" backgroundColor="#f8f9fb">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={'https://seeklogo.com/images/B/butterfly-logo-0A00378822-seeklogo.com.png'}
              alt=""
              style={{ width: '30px' }}
            />
            <h6 className="ms-2">BABYCARE ™</h6>
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink exact to="/Profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/ChangePassword" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Change Password</CDBSidebarMenuItem>
            </NavLink>
            <CDBSidebarMenuItem onClick={logoutHandler}>Logout</CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
  )
};

export default Sidebar;