import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaUser } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";

const UserSidebar = () => {
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
              <MenuItem icon={<FaUser />} component={<Link to="/Profile" />}>Profile</MenuItem>
              <MenuItem icon={<RiLockPasswordFill />} component={<Link to="/ChangePassword" />}>Change Password</MenuItem>
              <MenuItem icon={<BsBuildingsFill />} component={<Link to="/Property" />}>My Property</MenuItem>
          </Menu>          
        </div>
      </div>
    </Sidebar>

    <main>
      <div style={{ padding: '16px 24px', color: '#44596e' }}>
        <div style={{ marginBottom: '16px' }}>
          {broken && (
            <button className="sb-button" onClick={() => setToggled(!toggled)}>
              <i className="fa fa-bars" />
            </button>
          )}
        </div>
      </div>
    </main>
  </div>
)
};

export default UserSidebar;