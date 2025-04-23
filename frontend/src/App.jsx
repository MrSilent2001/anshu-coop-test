import './App.css'
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard.tsx";
import Welcome from "./pages/welcome.js";
import Login from "./pages/login.js";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Dashboard/>} />
    </Routes>
  )
}

export default App
