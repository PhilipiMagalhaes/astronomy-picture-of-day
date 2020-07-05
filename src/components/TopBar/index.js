import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import { MdAccountBox } from 'react-icons/md';
import './styles.css';
import Modal from '../Modal';

export default function TopBar({ currentUser, modal}) {
  const history = useHistory();

  function renderProfileButton() {
    if (currentUser !== null) {
      return (
        <div className='profile' onClick={() => {
          history.push('/profile');
        }
        }>
          <h2>My profile</h2>
          <MdAccountBox className='profileIcon'
            color='#FFF'
            size={80} />
        </div>
      );
    }
    else {
      return (
        <div className='profile' onClick={modal}>
          <h2>Sign in</h2>
          <MdAccountBox className='profileIcon'
            color='#FFF'
            size={80} />
        </div>
      );
    }
  }
 

  return (
    <div className='topBar'>
      <img src={logoImg} alt='NASA logo' onClick={() => {
        history.push('/');
      }} />

      <h1 onClick={() => {
        history.push('/');
      }}>Astronomy Picture of the Day</h1>

      {renderProfileButton()}
    </div>
  );
}