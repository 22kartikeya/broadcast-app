import './App.css'
import Login from './componenets/login';
import Signup from './componenets/signup';
import Landing from './componenets/landing';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from './componenets/AdminDashboard';
import UserDashboard from './componenets/UserDashboard';
import EmployeeDashboard from './componenets/EmployeeDashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
        <Route path="/UserDashboard" element={<UserDashboard/>}/>
        <Route path="/EmployeeDashboard" element={<EmployeeDashboard/>} />
        <Route path="/" element={<Landing/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
