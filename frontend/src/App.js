import "./App.css";
import Signup from "./screens/signup";
import Login from "./screens/Login";
import Admin from "./screens/Admin";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from "./Components/Navbar/Navbar";
import Home from "./screens/Home";
import Modal from "./Components/Modal/Modal";
function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Navbar/>
        <Routes>
                      <Route path="/sigup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<Admin/>}/>
         
        </Routes>
      </BrowserRouter>
      
      
      
      {/* <Modal/> */}

      
    </div>
  );
}

export default App;
