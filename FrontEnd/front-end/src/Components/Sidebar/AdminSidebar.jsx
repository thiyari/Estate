import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { RiContactsBookFill } from "react-icons/ri";

const AdminSidebar = () => {
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);


 

  return (
    <div style={{ display: 'flex', height: '100%'}}>
    <Sidebar 
      collapsed={collapsed}
      onChange={() => setCollapsed(!collapsed)}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      onBreakPoint={setBroken}
      breakPoint="md"
    className='border'>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fff' }}>
        <div style={{ flex: 1, marginBottom: '32px' }}>
          <Menu className='mt-5'>
              <MenuItem icon={<FaUser />} component={<Link to="/AdminProfile" />}>Admin Profile</MenuItem>
              <MenuItem icon={<RiLockPasswordFill />} component={<Link to="/ChangePassword" />}>Change Password</MenuItem>
              <SubMenu icon={<FaGear />} label="Settings">
                <MenuItem component={<Link to="/ManageAdmins" />}>Manage Admins</MenuItem>
                <MenuItem component={<Link to="/ManageUsers" />}>Manage Users</MenuItem>
              </SubMenu>
              <SubMenu icon={<MdEmail />} label="Requests">
                <MenuItem component={<Link to="/UsersRequests" />}>Users Requests</MenuItem>
                <MenuItem component={<Link to="/ServiceRequests" />}>Service Requests</MenuItem>
                <MenuItem component={<Link to="/ContactsRequests" />}>Contact Us</MenuItem>
              </SubMenu>
              <MenuItem icon={<RiContactsBookFill />} component={<Link to="/Contacts" />}>All Contacts</MenuItem>
          </Menu>          
        </div>
      </div>
    </Sidebar>

    <main>
      <div style={{ padding: '16px 24px', color: '#44596e' }}>
        <div style={{ marginBottom: '16px' }}>
          {broken && (
            <button className="sb-button" onClick={() => setToggled(!toggled)}>
              Toggle
            </button>
          )}
        </div>
      </div>
    </main>
  </div>
)
};

export default AdminSidebar;