import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Login from './Components/Login';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import ChangePassword from './Components/ChangePassword';
import {useState} from 'react'

function App() {

  const [LoggedIn, setLoggedIn] = useState(false)
  const setLogin = (status)=>{
    setLoggedIn(status);
  }
  return (
    <div>
      <Router>
      <Header LoggedIn={LoggedIn}/>
        <Routes>
          <Route path="/Profile" element = {<Profile onLogin={setLogin}/>} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/login" element = {<Login/>} />
          <Route path="/" element = {<Home/>} />
          <Route path="/ChangePassword" element = {<ChangePassword/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
