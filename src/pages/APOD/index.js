import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import api from '../../services/api';
import dateToday from '../../utils/dateToday';

import RenderMedia from '../../components/RenderMedia';

import './styles.css';

export default function APOD({ currentAPOD }) {
  const [APOD, setAPOD] = useState({ currentAPOD });
  useEffect((() => {
    async function getAPOD() {
      const response = await api.get('',{
        params:{
        date:dateToday()
      }
    });
      setAPOD(response.data);
    }
    async function getCustomAPOD() {
      const response = await api.get('', {
        params: {
          date: sessionStorage.getItem('dateApod')
        }
      });
      setAPOD(response.data);
      sessionStorage.removeItem('dateApod');
    }
    if (sessionStorage.getItem('dateApod') === null)
      getAPOD();
    else
      getCustomAPOD();
  }), [])

  return (
    <div className='APODiv'>
      <Link className='back-link' to='/test'>
        <TiArrowBack size={18} color='#fff' />To Main Page</Link>

      <a href='/test'>Discover the cosmos!  </a><p>
        Each day a different image or photograph of our fascinating universe is featured,
    along with a brief explanation written by a professional astronomer.</p>
      <RenderMedia APOD={APOD} />
      <h3>{APOD.date}</h3>
      <p /><strong>{APOD.title}</strong>
      <p>{APOD.explanation}</p>

    </div>
  );
}