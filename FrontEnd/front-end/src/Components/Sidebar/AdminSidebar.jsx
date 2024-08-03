import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from 'cdbreact';

const AdminSidebar = () => {

  return (
      <CDBSidebar className="border" maxWidth="230px" textColor="#333" backgroundColor="#ffffff">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={'https://seeklogo.com/images/B/butterfly-logo-0A00378822-seeklogo.com.png'}
              alt=""
              style={{ width: '30px' }}
            />
            <h6 className="ms-2">ESTATE ™</h6>
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink reloadDocument exact="true" to="/AdminProfile" className={(navData) => (navData.isActive ? "active-style" : 'none')}>
              <CDBSidebarMenuItem icon="fa fa-user">Admin Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/ChangePassword" className={(navData) => (navData.isActive ? "active-style" : 'none')}>
              <CDBSidebarMenuItem icon="fa-solid fa-gear">Change Password</CDBSidebarMenuItem>
            </NavLink>
            <NavLink reloadDocument exact="true" to="/ManageAdmins" className={(navData) => (navData.isActive ? "active-style" : 'none')}>
              <CDBSidebarMenuItem icon="fa-solid fa-address-card">Manage Admins</CDBSidebarMenuItem>
            </NavLink>
            <NavLink reloadDocument exact="true" to="/ManageUsers" className={(navData) => (navData.isActive ? "active-style" : 'none')}>
              <CDBSidebarMenuItem icon="fa-solid fa-address-card">Manage Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink reloadDocument exact="true" to="/UsersRequests" className={(navData) => (navData.isActive ? "active-style" : 'none')}>
              <CDBSidebarMenuItem icon="fa-solid fa-envelope">Users Requests</CDBSidebarMenuItem>
            </NavLink>
            <NavLink reloadDocument exact="true" to="/ServiceRequests" className={(navData) => (navData.isActive ? "active-style" : 'none')}>
              <CDBSidebarMenuItem icon="fa-solid fa-envelope">Service Requests</CDBSidebarMenuItem>
            </NavLink>
            <NavLink reloadDocument exact="true" to="/ContactsRequests" className={(navData) => (navData.isActive ? "active-style" : 'none')}>
              <CDBSidebarMenuItem icon="fa-solid fa-address-book">Contacts Requests</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
  )
};

export default AdminSidebar;