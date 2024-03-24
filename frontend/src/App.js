import "./App.css";
import Signup from "./screens/signup";
import Login from "./screens/Login";
import Admin from "./screens/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import AdminPage from "./screens/AdminPage";
import LearnLetter from "./screens/LearnLetter";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/sigup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/adminpage" element={<AdminPage/>}/>
          <Route path="/learnletter" element={<LearnLetter/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
