import React, {useState} from 'react';
import RenderMedia from '../RenderMedia';
import { Link } from 'react-router-dom';
import dateToday from '../../utils/dateToday';
import saveUserInStorage from '../../utils/saveUserInStorage';
import {store} from 'react-notifications-component';

import './styles.css';

export default function Card({ APOD, main, removeFunc }) {
  const [currentAPOD] = useState(APOD);

  function addApod() {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if(!user.APODS.find(apod => apod.date === APOD.date)){  
      user.APODS.push(APOD);
      saveUserInStorage(user);
      store.addNotification({
        title: 'APOD added successfully',
        insert: 'bottom',
        type: 'info',
        message: `'${APOD.title}' added to your APODs`,
        container: 'bottom-right',
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    }
    else{
      store.addNotification({
        title: 'Already added',
        insert: 'bottom',
        type: 'warning',
        message: `'${APOD.title}' is already in your APODs`,
        container: 'bottom-right',
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    } 
  }
  function removeApod() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const newApods = user.APODS.filter(apod => apod.date !== APOD.date);
    user.APODS = newApods;
    saveUserInStorage(user);
    removeFunc();
    store.addNotification({
      title: 'APOD removed successfully',
      insert: 'bottom',
      type: 'success',
      message: `'${APOD.title}' was removed from your APODs`,
      container: 'bottom-right',
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
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
      <Link to='/apod'>
        <p className='name'
          onClick={() => {
            sessionStorage.setItem('dateApod', APOD.date);
          }}>{currentAPOD.title} </p>
      </Link>
      <strong>Date: {currentAPOD.date}</strong>
      {renderText()}
      {renderButton(main)}
    </div>
  );
}