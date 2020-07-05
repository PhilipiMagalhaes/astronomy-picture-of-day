import React, { useState } from 'react';

import './styles.css';

export default function LoginForm({ cancel, changeContent }) {
  const [email, setEmail] = useState('');
  function handleLogin(e) {
    if(!localStorage.getItem(`${email.toLocaleLowerCase()}`))
    {
      alert('Email not registered!');
      e.preventDefault();
      return;
    }
    const user = JSON.parse(localStorage.getItem(`${email.toLocaleLowerCase()}`));
    localStorage.setItem('currentUser',JSON.stringify(user));
  }
  return (
    <div className='cardForm'>
      <form className='loginForm' onSubmit={handleLogin}>
        <h1>Login</h1>
        <section>
          <label>Your E-mail</label>
          <input placeholder='Yourmail@mail.com' onChange={(e) => {
            setEmail(e.target.value);
          }} />
        </section>
        <button type='submit'>Confirm</button>
      </form>
      <button className='changeFormButton' onClick={changeContent}
      >Not registered?</button>
      <button className='cancelButton' onClick={cancel}>Cancel</button>
    </div>
  );
}