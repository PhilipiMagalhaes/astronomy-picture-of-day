import React, { useState } from 'react';
import maxCharactersVerification from '../../utils/maxCharactersVerification';
import dateToday from '../../utils/dateToday';
import './styles.css'

export default function RegisterForm({ cancel, changeContent }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleRegister(e) {
    if(!localStorage.getItem(email.toLocaleLowerCase())){
      const user = {
        name,
        email:email.toLocaleLowerCase(),
        APODS:[],
        signedOn:dateToday()
      }
      localStorage.setItem(`${user.email}`,JSON.stringify(user));
      localStorage.setItem('currentUser',JSON.stringify(user));
    }
    else{
      e.preventDefault();
      alert('Email already in use!');
    }
   
  }

  return (
    <div className='cardForm'>
      <form className='registerForm' onSubmit={handleRegister}>
        <h1>Register</h1>
        <section>
          <label>Your name</label>
          <input placeholder='Your name' onChange={(e) => {
            if (maxCharactersVerification(e.target.value)) {
              alert('Max-Characters reached');
              return;
            }
            setName(e.target.value);
          }
          } />
        </section>
        <section>
          <label>Your E-mail</label>
          <input placeholder='Yourmail@mail.com' onChange={(e) => {
            setEmail(e.target.value);
          }} />
        </section>
        <button type='submit'>Confirm</button>
      </form>
      <button className='changeFormButton' onClick={changeContent}>Already registered?</button>
      <button className='cancelButton' onClick={cancel}>Cancel</button>
    </div>
  );
}