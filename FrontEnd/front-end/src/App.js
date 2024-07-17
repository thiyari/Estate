import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Login from './Components/Login';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import ChangePassword from './Components/ChangePassword';
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
          <Route path="/Profile" element = {<Profile LoginStatus={handleLogin}/>} />
          <Route path="/register" element = {<Register LoginStatus={handleLogin}/>} />
          <Route path="/login" element = {<Login />} />
          <Route path="/" element = {<Home LoginStatus={handleLogin}/>} />
          <Route path="/ChangePassword" element = {<ChangePassword LoginStatus={handleLogin}/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
