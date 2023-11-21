import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'react-router'; // Import 'Routes' from 'react-router'

import Login from './components/login'
import HomeUser from './components/home';
import Register from './components/register';
import HomeAdmin from './components/homeadmin';

function App() {
  return (
    <Router>
     <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homeuser" element={<HomeUser/>} />
        <Route path="/homeadmin" element={<HomeAdmin/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
