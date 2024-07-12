import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';

function App() {


  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element = {<Home/>} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/login" element = {<Login/>} />
          <Route path="/" element = {<Home/>} />
        </Routes>
      </BrowserRouter>

      <Footer/>
    </div>
  );
}

export default App;
