import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Login from './Components/Login';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import ChangePassword from './Components/ChangePassword';
import { useState } from 'react';

function App(props) {
const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <div>
      <Router>
      <Header LoginStatus={isLoggedIn}/>
        <Routes>
          <Route path="/Profile" element = {<Profile LoginStatus={(status)=>{setIsLoggedIn(status)}}/>} />
          <Route path="/register" element = {<Register LoginStatus={(status)=>{setIsLoggedIn(status)}}/>} />
          <Route path="/login" element = {<Login />} />
          <Route path="/" element = {<Home LoginStatus={(status)=>{setIsLoggedIn(status)}}/>} />
          <Route path="/ChangePassword" element = {<ChangePassword LoginStatus={(status)=>{setIsLoggedIn(status)}}/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
