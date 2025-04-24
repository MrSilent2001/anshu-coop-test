import './App.css'
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard.tsx";
import Login from "./pages/login.jsx";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Dashboard/>} />
    </Routes>
  )
}

export default App
