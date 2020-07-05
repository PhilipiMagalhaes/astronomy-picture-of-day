import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './components/TopBar';
import Routes from './routes';
import Footer from './components/Footer';
import Modal from './components/Modal';

import './global.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  useState(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
  })
  function showModalFunc() {
    if (showModal)
      return (<Modal cancel={() => { setShowModal(false) }} />);
  }
  return (
    <BrowserRouter>
      <TopBar currentUser={currentUser} modal={() => { setShowModal(true) }} />
      <Routes />
      <Footer />
      {showModalFunc()}
    </BrowserRouter>
  );
}

export default App;
