import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import TopBar from './components/TopBar';
import Routes from './routes';
import Footer from './components/Footer';
import Modal from './components/Modal';

import 'react-notifications-component/dist/theme.css';
import './global.css';
import './responsive.css';

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
      <ReactNotification />
      <TopBar currentUser={currentUser} modal={() => { setShowModal(true) }} />
      <Routes />
      <Footer />
      {showModalFunc()}
    </BrowserRouter>
  );
}

export default App;
