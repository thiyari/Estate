import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { RiContactsBookFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { MdHomeRepairService } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import { BiSolidUserRectangle } from "react-icons/bi";

const AdminSidebar = () => {
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);


 

  return (
    <div style={{ display: 'flex', height: '100%'}}>
    <Sidebar 
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      onBreakPoint={setBroken}
      breakPoint="md"
    className='border'>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fff' }}>
        <div style={{ flex: 1, marginBottom: '32px' }}>
          <Menu>
            <MenuItem icon={<button className="btn" style={{width:50}} onClick={() => setCollapsed(!collapsed)}><i className="fa fa-bars" /></button>}>Estate ™</MenuItem>
              <MenuItem icon={<FaUser />} component={<Link to="/AdminProfile" />}>Admin Profile</MenuItem>
              <MenuItem icon={<RiLockPasswordFill />} component={<Link to="/ChangePassword" />}>Change Password</MenuItem>
              <SubMenu icon={<FaGear />} label="Settings">
                <MenuItem icon={<MdAdminPanelSettings />} component={<Link to="/ManageAdmins" />}>Manage Admins</MenuItem>
                <MenuItem icon={<RiShieldUserFill />} component={<Link to="/ManageUsers" />}>Manage Users</MenuItem>
              </SubMenu>
              <SubMenu icon={<MdEmail />} label="Requests">
                <MenuItem icon={<BiSolidUserRectangle />} component={<Link to="/UsersRequests" />}>Users Requests</MenuItem>
                <MenuItem icon={<MdHomeRepairService />} component={<Link to="/ServiceRequests" />}>Service Requests</MenuItem>
                <MenuItem icon={<BiSolidContact />} component={<Link to="/ContactsRequests" />}>Contact Us</MenuItem>
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
            <button className="btn btn-default border" style={{width: 40, backgroundColor: "#fff"}} onClick={() => setToggled(!toggled)}>
              <i className="fa fa-bars" />
            </button>
          )}
        </div>
      </div>
    </main>
  </div>
)
};

export default AdminSidebar;