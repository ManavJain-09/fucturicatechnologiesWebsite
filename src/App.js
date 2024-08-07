import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Homepage from "./components/Homepage/homepage"
import Layout from './Layout';

import Login from './components/loginpage/Login';
import Hero from './components/Adminpage/Hero';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const role = useSelector((state) => state.auth.role);

  return role === "admin" ? element : <Navigate to="/" />;
};

function App() {
  return (
    
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/admin-login" element={<Login/>}/>
          <Route path='/admin-panel' element={<ProtectedRoute element={<Hero/>}/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
