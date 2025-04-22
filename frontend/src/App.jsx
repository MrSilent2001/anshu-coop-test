import './App.css'
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard.tsx";
import Welcome from "./pages/welcome.js";
import Login from "./pages/login.js";
import CreatePatients from "./pages/createPatients.js";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Dashboard/>} />
        <Route path="/add-new-patient" element={<CreatePatients/>} />
    </Routes>
  )
}

export default App
