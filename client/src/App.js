import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import Modal from './components/Modal/Modal';
import './App.css'
import { useGlobalContext } from './context/App';

import Home from './components/Home/Home';
import Loader from './components/Loader/Loader'
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login'

import axios from 'axios';
axios.defaults.withCredentials = true;




function App() {
  const { isModal, loader } = useGlobalContext();
  return (
    <Router>
      {loader&&<Loader />}
      {isModal && <Modal />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
