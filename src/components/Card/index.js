import React, { useState, useEffect } from 'react';
import RenderMedia from '../RenderMedia';
import { Link } from 'react-router-dom';
import dateToday from '../../utils/dateToday';
import saveUserInStorage from '../../utils/saveUserInStorage';
import './styles.css';

export default function Card({ APOD, main, removeFunc }) {
  const [currentAPOD, setCurrentAPOD] = useState(APOD);

  function addApod() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.APODS.push(APOD);
    saveUserInStorage(user);
  }
  function removeApod() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const newApods = user.APODS.filter(apod => apod.date !== APOD.date);
    user.APODS = newApods;
    saveUserInStorage(user);
    removeFunc();
  }
  function renderButton() {
    if (main) {
      return (
        <button onClick={() => {
          if (!localStorage.getItem('currentUser')) {
            alert('Log in to save APODS!');
            return;
          }
          addApod()
        }
        }>Add to my APODs</button>
      );
    }
    else {
      return (
        <button onClick={() => {
          removeApod();
        }}>Remove from my APODs</button>
      );
    }
  }
  function renderText() {
    if (main && APOD.date === dateToday()) {
      let explanation = '';

      if (APOD.explanation.length > 760)
        explanation = `${APOD.explanation.substring(0, 760)}...`;
      else
        explanation = APOD.explanation;

      return (
        <p className='explanation'>{explanation}</p>
      )
    }
  }

  return (
    <div className='card'>
      <RenderMedia APOD={currentAPOD} />
      <Link to='/'>
        <p className='name'
          onClick={() => {
            const date = dateToday();
            sessionStorage.setItem('dateApod', APOD.date);
          }}>{currentAPOD.title} </p>
      </Link>
      <strong>Date: {currentAPOD.date}</strong>
      {renderText()}
      {renderButton(main)}
    </div>
  );
}