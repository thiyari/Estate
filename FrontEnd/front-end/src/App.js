import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Login from './Components/Login';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import ChangePassword from './Components/ChangePassword';

function App() {


  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/Profile" element = {<Profile/>} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/login" element = {<Login/>} />
          <Route path="/" element = {<Home/>} />
          <Route path="/ChangePassword" element = {<ChangePassword/>} />
        </Routes>
      </BrowserRouter>

      <Footer/>
    </div>
  );
}

export default App;
