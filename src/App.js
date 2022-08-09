import './App.css';
import "bootstrap/dist/css/bootstrap.css";
// import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageLayout from './pages/Pagelayout';
import Login from './pages/Login';
import Ads from './pages/adminPages/Ads';
import Permission from './pages/adminPages/Permission';
import Lead from './pages/adminPages/Lead';
import User from './pages/adminPages/User';
import Dashboard from './pages/adminPages/Dashboard';
import AddProperty from './pages/AddProperty/AddProperty';
import Axios from 'axios'

Axios.defaults.baseURL = 'https://backend-metroghar-trial.herokuapp.com/api/v1';

function App() {
  return (
    <div className="App d-flex flex-column">
      <Navbar />
      <BrowserRouter>
        <PageLayout >
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />}  />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<Dashboard />} />
            <Route path="admin/addproperty" element={<AddProperty />} />
            <Route path="ads" element={<Ads />} />
            <Route path="permission" element={<Permission />} />
            <Route path="lead-management" element={<Lead />} />
            <Route path="user-management" element={<User />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
