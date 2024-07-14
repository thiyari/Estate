import React from 'react';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from 'cdbreact';

const Sidebar = () => {
  return (
      <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
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
            <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Components</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="chart-line" iconType="solid">
              metrics
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
  )
};

export default Sidebar;