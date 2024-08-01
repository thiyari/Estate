import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Login from './Components/Login';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import ChangePassword from './Components/ChangePassword';
import Property from './Components/Property';
import Plots from './Components/Plots';
import Houses from './Components/Houses';
import Commercial from './Components/Commercial';
import Checkout from './Components/Checkout';
import ContactUs from './Components/ContactUs';
import Search from './Components/Search';
import AdminProfile from './Components/AdminProfile';
import ManageAdmins from './Components/ManageAdmins';
import ManageUsers from './Components/ManageUsers';
import AddNewAdmin from './Components/AddNewAdmin';
import { useState } from 'react';

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

const handleLogin = (status) => {
  setIsLoggedIn(status)
}

  return (
    <div>
      <Router>
      <Header LoginStatus={isLoggedIn} />
        <Routes>
          <Route path="/" element = {<Home LoginStatus={handleLogin}/>} />
          <Route path="/Profile" element = {<Profile LoginStatus={handleLogin}/>} />
          <Route path="/Register" element = {<Register LoginStatus={handleLogin}/>} />
          <Route path="/Login" element = {<Login />} />
          <Route path="/Plots" element = {<Plots LoginStatus={handleLogin}/>} />
          <Route path="/Houses" element = {<Houses LoginStatus={handleLogin}/>} />
          <Route path="/Commercial" element = {<Commercial LoginStatus={handleLogin}/>} />
          <Route path="/ChangePassword" element = {<ChangePassword LoginStatus={handleLogin}/>} />
          <Route path="/Property" element = {<Property LoginStatus={handleLogin}/>} />
          <Route path="/ContactUs" element = {<ContactUs LoginStatus={handleLogin}/>} />
          <Route path="/Search" element = {<Search LoginStatus={handleLogin}/>} />
          <Route path="/AddNewAdmin" element = {<AddNewAdmin LoginStatus={handleLogin}/>} />
          <Route path="/AdminProfile" element = {<AdminProfile LoginStatus={handleLogin}/>} />
          <Route path="/ManageAdmins" element = {<ManageAdmins LoginStatus={handleLogin}/>} />
          <Route path="/ManageUsers" element = {<ManageUsers LoginStatus={handleLogin}/>} />
          <Route path="/Checkout/:propertyid" element = {<Checkout LoginStatus={handleLogin}/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
