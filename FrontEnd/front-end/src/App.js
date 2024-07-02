import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';




function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element = {<Home/>} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/login" element = {<Login/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
