import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from 'cdbreact';

const Sidebar = () => {

  return (
      <CDBSidebar textColor="#333" backgroundColor="#f8f9fb">
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
            <NavLink exact to="/Profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa fa-user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/ChangePassword" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-gear">Change Password</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
  )
};

export default Sidebar;