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
  const [Id,setId] = useState("");
  const setLogin = (status)=>{
    setLoggedIn(status);
  }
  const setObjectId = (id)=>{
    setId(id)
  }
  return (
    <div>
      <Router>
      <Header LoggedIn={LoggedIn}/>
        <Routes>
          <Route path="/Profile" element = {<Profile Id={Id} onLogin={setLogin}/>} />
          <Route path="/register" element = {<Register onLogin={setLogin}/>} />
          <Route path="/login" element = {<Login ObjectId={setObjectId}/>} />
          <Route path="/" element = {<Home onLogin={setLogin}/>} />
          <Route path="/ChangePassword" element = {<ChangePassword Id={Id} onLogin={setLogin}/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
