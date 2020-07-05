import React, { useState, useEffect } from 'react';
import './styles.css';
import RegisterForm from '../RegisterForm';
import LoginForm from '../LoginForm';

export default function Modal({cancel}) {
  const [typeForm, setTypeForm] = useState('Login');

  function renderContent() {
    if (typeForm === 'Login') {
      return (
        <LoginForm cancel={cancel} changeContent={() => {
          setTypeForm('Register')
        }}/>
      );
    }
    if(typeForm === 'Register'){
      return(
        <RegisterForm cancel={cancel} changeContent={()=>{
          setTypeForm('Login')
        }}/>
      );
    }
  }

  return (
    <div className='modal'>
      {
        renderContent()
      }
    </div>
  )
}